import express from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getRepository, getConnection } from "typeorm";
import multer from "multer";

import AppError from "../errors/AppError";
import uploadConfig from "../config/multer";
import Place from "../database/entity/Place";

const placesRouter = express.Router();

const upload = multer(uploadConfig.multerStorageImagePlace);
const unlinkAsyncPlaceImage = promisify(fs.unlink);

placesRouter.get("/", async (req, resp) => {
  const placeRepo = getRepository(Place);

  const { limit, categorie_id, city_id } = req.query;

  try {
    if (categorie_id) {
      const allPlaces = await placeRepo.find({
        cache: true,
        // @ts-ignore
        take: limit ? parseInt(limit) : undefined,
        where: { categorie_id },
      });

      return resp.status(200).send(allPlaces);
    } else if (city_id) {
      const allPlaces = await placeRepo.find({
        cache: true,
        // @ts-ignore
        take: limit ? parseInt(limit) : undefined,
        where: { city_id },
      });

      return resp.status(200).send(allPlaces);
    } else {
      const allPlaces = await placeRepo.find({
        cache: true,
        // @ts-ignore
        take: limit ? parseInt(limit) : undefined,
      });

      return resp.status(200).send(allPlaces);
    }
  } catch (err) {
    throw new AppError(err, 400);
  }
});

placesRouter.get("/:id", async (req, resp) => {
  const placeRepo = getRepository(Place);

  const { id } = req.params;

  try {
    const place = await placeRepo.findOne({ id });

    if (!place) throw new AppError("Error on get place", 400);

    return resp.status(200).send(place);
  } catch (err) {
    throw new AppError("Error on get place", 400);
  }
});

placesRouter.post("/create", upload.single("image"), async (req, resp) => {
  const placeRepo = getRepository(Place);

  const {
    name,
    description,
    phone_number,
    address,
    rating,
    city_id,
    categorie_id,
  } = req.body;

  const place = placeRepo.create({
    name,
    image: req.file.filename,
    address,
    rating,
    description,
    phone_number,
    categorie_id,
    city_id,
  });

  try {
    await placeRepo.save(place);

    return resp.status(200).send();
  } catch (err) {
    throw new AppError(err, 400);
  }
});

placesRouter.post(
  "/update/:id",
  upload.single("update-image"),
  async (req, resp) => {
    const { id } = req.params;
    const {
      name,
      description,
      image,
      address,
      rating,
      phone_number,
    } = req.body;

    try {
      if (req.file) {
        const fileName = req.file.filename;

        const placesRepo = getRepository(Place);
        const place = await placesRepo.findOne({ id });

        if (!place) throw new AppError("Error on update place", 400);

        const filePath = path.resolve(
          uploadConfig.uploadsFolder,
          "places",
          place.image
        );

        const updatePlace = {
          name,
          description,
          image: fileName,
          address,
          rating,
          phone_number,
        };

        await getConnection()
          .createQueryBuilder()
          .update(Place)
          // @ts-ignore
          .set(updatePlace)
          .where("id = :id", { id })
          .execute();

        await unlinkAsyncPlaceImage(filePath);

        return resp.status(200).send();
      }

      const updatePlace = {
        name,
        description,
        image,
        address,
        rating,
        phone_number,
      };

      await getConnection()
        .createQueryBuilder()
        .update(Place)
        // @ts-ignore
        .set(updatePlace)
        .where("id = :id", { id })
        .execute();

      return resp.status(200).send();
    } catch (err) {
      throw new AppError(err, 400);
    }
  }
);

placesRouter.delete("/delete/:id", async (req, resp) => {
  const { id } = req.params;

  const placesRepo = getRepository(Place);

  try {
    const place = await placesRepo.findOne({ id });
    if (place) {
      const filePath = path.resolve(
        uploadConfig.uploadsFolder,
        "places",
        place.image
      );

      await unlinkAsyncPlaceImage(filePath);

      await placesRepo.delete({ id });

      return resp.status(200).send();
    } else {
      throw new AppError("Error on delete place", 400);
    }
  } catch {
    throw new AppError("Error on delete place", 400);
  }
});

placesRouter.use(
  "/image",
  express.static(path.resolve(uploadConfig.uploadsFolder, "places"))
);

export default placesRouter;
