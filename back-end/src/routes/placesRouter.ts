import express from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getRepository, getConnection } from "typeorm";
import multer from "multer";

import AppError from "../errors/AppError";
import uploadConfig from "../config/multer";
import Place from "../database/entity/Place";
import PlaceService from "../database/entity/PlaceService";
import PlaceEvent from "../database/entity/PlaceEvent";

const placesRouter = express.Router();

const upload = multer(uploadConfig.multerStorageImagePlace);
const unlinkAsyncPlaceImage = promisify(fs.unlink);

placesRouter.get("/", async (req, resp) => {
  const placeRepo = getRepository(Place);

  const { limit, categorie_id, city_id } = req.query;

  try {
    if (categorie_id && city_id) {
      const allPlaces = await placeRepo.find({
        cache: true,
        // @ts-ignore
        take: limit ? parseInt(limit) : undefined,
        where: { categorie_id, city_id },
      });

      if (!allPlaces) throw new AppError("Error on get places", 400);

      return resp.status(200).send(allPlaces);
    } else if (categorie_id) {
      const allPlaces = await placeRepo.query(`
        SELECT "place"."id" AS id, "place"."name" AS place_name, "place"."image", "place"."description", "place"."phone_number", "place"."address", "place"."rating", "place"."city_id", "place"."categorie_id", "place"."created_at", "place"."updated_at", "categorie"."iconName", "categorie"."name" AS categorie_name 
        FROM "places" "place" 
        INNER JOIN "categories" "categorie" ON "categorie"."id" = "place"."categorie_id" 
        WHERE categorie.id = '${categorie_id}'
        ORDER BY place.rating DESC 
        ${
          // @ts-ignore
          limit ? "LIMIT " + parseInt(limit) : ""
        }
      `);

      if (!allPlaces) throw new AppError("Error on get places", 400);

      return resp.status(200).send(allPlaces);
    } else if (city_id) {
      const allPlaces = await placeRepo.query(`
        SELECT "place"."id" AS id, "place"."name" AS place_name, "place"."image", "place"."description", "place"."phone_number", "place"."address", "place"."rating", "place"."city_id", "place"."categorie_id", "place"."created_at", "place"."updated_at", "categorie"."iconName", "categorie"."name" AS categorie_name 
        FROM "places" "place" 
        INNER JOIN "categories" "categorie" ON "categorie"."id" = "place"."categorie_id" 
        WHERE place.city_id = '${city_id}'
        ORDER BY place.rating DESC
        ${
          // @ts-ignore
          limit ? "LIMIT " + parseInt(limit) : ""
        }
      `);

      if (!allPlaces) throw new AppError("Error on get places", 400);

      return resp.status(200).send(allPlaces);
    } else {
      const allPlaces = await placeRepo.query(`
        SELECT "place"."id" AS id, "place"."name" AS place_name, "place"."image", "place"."description", "place"."phone_number", "place"."address", "place"."rating", "place"."city_id", "place"."categorie_id", "place"."created_at", "place"."updated_at", "categorie"."iconName", "categorie"."name" AS categorie_name 
        FROM "places" "place" 
        INNER JOIN "categories" "categorie" ON "categorie"."id" = "place"."categorie_id" 
        ORDER BY place.rating DESC 
        ${
          // @ts-ignore
          limit ? "LIMIT " + parseInt(limit) : ""
        }
      `);

      if (!allPlaces) throw new AppError("Error on get places", 400);

      return resp.status(200).send(allPlaces);
    }
  } catch (err) {
    throw new AppError("Error on get places", 400);
  }
});

placesRouter.get("/:id", async (req, resp) => {
  const placeRepo = getRepository(Place);

  const { id } = req.params;

  try {
    const place = await placeRepo
      .createQueryBuilder("place")
      .select(
        "*, place.id AS id, place.name AS place_name, categorie.name AS categorie_name"
      )
      .innerJoin("categories", "categorie", "categorie.id =  place.categorie")
      .where(`place.id='${id}'`)
      .getRawOne();

    if (!place) throw new AppError("Error on get place", 400);

    return resp.status(200).send(place);
  } catch (err) {
    throw new AppError(err, 400);
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
    throw new AppError("Error on create place", 400);
  }
});

placesRouter.post("/create/service/:id", async (req, resp) => {
  const { id } = req.params;
  const { service } = req.body;

  const manageService = service.map((timeService: string, i: number) => {
    return {
      timeOpen: timeService,
      order: i + 1,
      place_id: id,
    };
  });

  const placeServiceRepo = getRepository(PlaceService);

  try {
    await placeServiceRepo.delete({ place_id: id });

    await placeServiceRepo
      .createQueryBuilder()
      .insert()
      .values(manageService)
      .execute();

    return resp.status(200).send();
  } catch (err) {
    throw new AppError("Error on create service of place", 400);
  }
});

placesRouter.get("/show/service/:id", async (req, resp) => {
  const { id } = req.params;

  const placeServiceRepo = getRepository(PlaceService);

  try {
    const serviceOfPlace = await placeServiceRepo.find({
      cache: true,
      where: {
        place_id: id,
      },
    });

    if (!serviceOfPlace)
      throw new AppError("Error on get service of place", 400);

    if (serviceOfPlace.length === 0) return resp.status(200).send(undefined);

    const daysOfWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabádo",
    ];

    const serviceEditPlace = serviceOfPlace.map((service, i: number) => {
      return {
        dayOfWeek: daysOfWeek[i],
        ...service,
      };
    });

    return resp.status(200).send(serviceEditPlace);
  } catch (err) {
    throw new AppError("Error on get service of place", 400);
  }
});

placesRouter.delete("/delete/service/:id", async (req, resp) => {
  const { id } = req.params;

  const placeServiceRepo = getRepository(PlaceService);

  try {
    await placeServiceRepo.delete({ id });

    return resp.status(200).send();
  } catch {
    throw new AppError("Error on delete service", 400);
  }
});

placesRouter.post("/create/event/:id", async (req, resp) => {
  const { id } = req.params;
  const { startDay, endDay, year } = req.body;

  const placeEventRepo = getRepository(PlaceEvent);

  try {
    await placeEventRepo.delete({ place_id: id });

    await placeEventRepo
      .createQueryBuilder()
      .insert()
      .values({
        startDay,
        endDay,
        year,
        place_id: id,
      })
      .execute();

    return resp.status(200).send();
  } catch (err) {
    throw new AppError(err, 400); //"Error on create event of place"
  }
});

placesRouter.get("/show/event/:id", async (req, resp) => {
  const { id } = req.params;

  const placeEventRepo = getRepository(PlaceEvent);

  try {
    const serviceOfPlace = await placeEventRepo.findOne({
      cache: true,
      where: {
        place_id: id,
      },
    });

    if (!serviceOfPlace) throw new AppError("Error on get event of place", 400);

    return resp.status(200).send(serviceOfPlace);
  } catch (err) {
    throw new AppError("Error on get event of place", 400);
  }
});

placesRouter.delete("/delete/event/:id", async (req, resp) => {
  const { id } = req.params;

  const placeEventRepo = getRepository(PlaceEvent);

  try {
    await placeEventRepo.delete({ id });

    return resp.status(200).send();
  } catch {
    throw new AppError("Error on delete event", 400);
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
      phone_number,
      categorie_id,
    } = req.body;

    const placesRepo = getRepository(Place);

    try {
      if (req.file) {
        const fileName = req.file.filename;

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
          phone_number,
          categorie_id,
        };

        await placesRepo
          .createQueryBuilder()
          .update({
            name,
            description,
            image,
            address,
            phone_number,
            categorie_id,
          })
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
        phone_number,
        categorie_id,
      };

      await placesRepo
        .createQueryBuilder()
        .update({
          name,
          description,
          image,
          address,
          phone_number,
          categorie_id,
        })
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
