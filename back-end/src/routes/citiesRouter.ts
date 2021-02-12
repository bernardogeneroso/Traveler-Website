import express from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getRepository, getConnection, getManager } from "typeorm";
import multer from "multer";

import City from "../database/entity/City";
import uploadConfig from "../config/multer";
import AppError from "../errors/AppError";

const citiesRouter = express.Router();

const upload = multer(uploadConfig.multerStorageImageCity);
const unlinkAsyncPlaceImage = promisify(fs.unlink);

citiesRouter.get("/", async (req, resp) => {
  const citiesRepo = getRepository(City);

  const { limit, search } = req.query;

  try {
    const allCities = await citiesRepo
      .createQueryBuilder("city")
      // @ts-ignore
      .take(limit ? parseInt(limit) : undefined)
      .select(
        search
          ? [
              "*",
              `CASE WHEN position('${search}' in lower(city.name)) > 0 THEN true ELSE false END  AS "opacity"`,
            ]
          : []
      )
      .getRawMany();

    return resp.status(200).send(allCities);
  } catch (err) {
    throw new AppError(err, 400);
  }
});

citiesRouter.get("/:id", async (req, resp) => {
  const { id } = req.params;

  const citiesRepo = getRepository(City);

  try {
    const city = await citiesRepo.findOne({ id });

    return resp.status(200).send(city);
  } catch {
    throw new AppError("Error on get city", 400);
  }
});

citiesRouter.post("/create", upload.single("image"), async (req, resp) => {
  const citiesRepo = getRepository(City);

  const { name, description, locals } = req.body;

  const city = citiesRepo.create({
    name,
    image: req.file.filename,
    locals,
    description,
  });

  try {
    await citiesRepo.save(city);

    return resp.status(200).send(city);
  } catch {
    throw new AppError("Error on create city", 400);
  }
});

citiesRouter.post(
  "/update/:id",
  upload.single("update-image"),
  async (req, resp) => {
    const { id } = req.params;
    const { name, description, image } = req.body;

    try {
      if (req.file) {
        const fileName = req.file.filename;

        const citiesRepo = getRepository(City);
        const user = await citiesRepo.findOne({ id });

        if (!user) throw new AppError("Error on update city", 400);

        const filePath = path.resolve(
          uploadConfig.uploadsFolder,
          "cities",
          user.image
        );

        const city = {
          name,
          description,
          image: fileName,
        };

        await getConnection()
          .createQueryBuilder()
          .update(City)
          // @ts-ignore
          .set(city)
          .where("id = :id", { id })
          .execute();

        await unlinkAsyncPlaceImage(filePath);

        return resp.status(200).send();
      }

      const city = {
        name,
        description,
        image,
      };

      await getConnection()
        .createQueryBuilder()
        .update(City)
        // @ts-ignore
        .set(city)
        .where("id = :id", { id })
        .execute();

      return resp.status(200).send();
    } catch {
      throw new AppError("Error on update city", 400);
    }
  }
);

citiesRouter.delete("/delete/:id", async (req, resp) => {
  const { id } = req.params;

  const citiesRepo = getRepository(City);

  try {
    const user = await citiesRepo.findOne({ id });
    if (user) {
      const filePath = path.resolve(
        uploadConfig.uploadsFolder,
        "cities",
        user.image
      );

      await unlinkAsyncPlaceImage(filePath);

      await citiesRepo.delete({ id });

      return resp.status(200).send();
    } else {
      throw new AppError("Error on delete city", 400);
    }
  } catch {
    throw new AppError("Error on delete city", 400);
  }
});

citiesRouter.use(
  "/image",
  express.static(path.resolve(uploadConfig.uploadsFolder, "cities"))
);

export default citiesRouter;
