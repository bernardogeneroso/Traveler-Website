import express from "express";
import { getRepository } from "typeorm";

import AppError from "../errors/AppError";
import Categorie from "../database/entity/Categorie";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, resp) => {
  const categorieRepo = getRepository(Categorie);

  try {
    const allCategories = await categorieRepo.find({
      cache: true,
    });

    return resp.status(200).send(allCategories);
  } catch (err) {
    throw new AppError("Error on get category", 400);
  }
});

categoriesRouter.post("/create", async (req, resp) => {
  const categorieRepo = getRepository(Categorie);

  const { name, iconName } = req.body;

  try {
    const category = categorieRepo.create({
      name,
      iconName,
    });

    await categorieRepo.save(category);

    return resp.status(200).send(category);
  } catch (err) {
    throw new AppError("Error on create category", 400);
  }
});

categoriesRouter.delete("/delete/:id", async (req, resp) => {
  const categorieRepo = getRepository(Categorie);

  const { id } = req.params;

  try {
    await categorieRepo.delete({ id });

    return resp.status(200).send();
  } catch (err) {
    throw new AppError("Error on delete category", 400);
  }
});

export default categoriesRouter;
