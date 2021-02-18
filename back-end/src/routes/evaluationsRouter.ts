import express, { Router } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getRepository, getConnection } from "typeorm";
import multer from "multer";

import Evaluation from "../database/entity/Evaluation";
import uploadConfig from "../config/multer";
import AppError from "../errors/AppError";
import Place from "../database/entity/Place";
import City from "../database/entity/City";
import Categorie from "../database/entity/Categorie";

const evaluationsRouter = Router();

const upload = multer(uploadConfig.multerStorageAvatarEvaluation);
const unlinkAsyncPlaceImage = promisify(fs.unlink);

evaluationsRouter.get("/:action", async (req, resp) => {
  const { action } = req.params;

  const evaluationsRepo = getRepository(Evaluation);

  try {
    let actionSQL = "";

    if (action === "recent") {
      actionSQL = "approved = 0";
    } else if (action === "old") {
      actionSQL = "approved = 1 AND approved = 2";
    } else if (action === "accepted") {
      actionSQL = "approved = 1";
    } else if (action === "refused") {
      actionSQL = "approved = 2";
    }

    const allEvaluations = await evaluationsRepo
      .createQueryBuilder("evaluation")
      .select(
        "evaluation.*, place.name AS place_name, city.name AS city_name, categorie.name AS categorie_name"
      )
      .innerJoin(Place, "place", "evaluation.place_id = place.id")
      .innerJoin(City, "city", "place.city_id = city.id")
      .innerJoin(Categorie, "categorie", "categorie.id = place.categorie_id")
      .orderBy("evaluation.approved", "ASC")
      .where(actionSQL)
      .getRawMany();

    return resp.status(200).send(allEvaluations);
  } catch (err) {
    throw new AppError("Error on get evaluations", 404);
  }
});

evaluationsRouter.post("/approved/:status/:id", async (req, resp) => {
  const { id, status } = req.params;

  const evaluationsRepo = getRepository(Evaluation);

  try {
    if (!status) throw new AppError("Error on change approved");

    await evaluationsRepo
      .createQueryBuilder()
      .update()
      .set({
        approved: parseInt(status),
      })
      .where("id = :id", { id })
      .execute();

    resp.status(200).send();
  } catch {
    throw new AppError("Error on change approved");
  }
});

evaluationsRouter.post(
  "/create",
  upload.single("image-avatar"),
  async (req, resp) => {
    const evaluationsRepo = getRepository(Evaluation);

    const { name, description, rating, place_id } = req.body;

    try {
      const evaluation = evaluationsRepo.create({
        name,
        description,
        rating: parseInt(rating),
        avatar: req.file.filename,
        place_id,
      });

      await evaluationsRepo.save(evaluation);

      resp.status(200).send(evaluation);
    } catch {
      throw new AppError("Error on create evaluation");
    }
  }
);

evaluationsRouter.delete("/delete/:id", async (req, resp) => {
  const { id } = req.params;

  const evaluationsRepo = getRepository(Evaluation);

  try {
    const evaluation = await evaluationsRepo.findOne({ id });
    if (evaluation) {
      const filePath = path.resolve(
        uploadConfig.uploadsFolder,
        "evaluations",
        evaluation.avatar
      );

      await unlinkAsyncPlaceImage(filePath);

      await evaluationsRepo.delete({ id });

      resp.status(200).send();
    } else {
      throw new AppError("Error on delete evaluation", 400);
    }
  } catch {
    throw new AppError("Error on delete evaluation", 400);
  }
});

evaluationsRouter.use(
  "/image-avatar",
  express.static(path.resolve(uploadConfig.uploadsFolder, "evaluations"))
);

export default evaluationsRouter;
