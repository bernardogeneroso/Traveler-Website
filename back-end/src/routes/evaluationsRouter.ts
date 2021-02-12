import express, { Router } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { getRepository, getConnection } from "typeorm";
import multer from "multer";

import Evaluation from "../database/entity/Evaluation";
import uploadConfig from "../config/multer";
import AppError from "../errors/AppError";

const evaluationsRouter = Router();

const upload = multer(uploadConfig.multerStorageAvatarEvaluation);
const unlinkAsyncPlaceImage = promisify(fs.unlink);

evaluationsRouter.get("/", async (req, resp) => {
  const evaluationsRepo = getRepository(Evaluation);

  try {
    const allEvaluations = await evaluationsRepo.find();

    resp.status(200).send(allEvaluations);
  } catch {
    throw new AppError("Error on get evaluations");
  }
});

evaluationsRouter.post("/approved/:status/:id", async (req, resp) => {
  const { id, status } = req.params;

  try {
    if (!status) throw new AppError("Error on change approved");

    await getConnection()
      .createQueryBuilder()
      .update(Evaluation)
      // @ts-ignore
      .set({
        approved: parseInt(status),
      })
      .where("id = :id", { id })
      .execute();
  } catch {
    throw new AppError("Error on change approved");
  }

  resp.status(200).send();
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
