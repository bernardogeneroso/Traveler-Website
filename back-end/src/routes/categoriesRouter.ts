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
    throw new AppError("Error on get categorie", 400);
  }
});

categoriesRouter.get("/:id", async (req, resp) => {
  const { id } = req.params;

  const categorieRepo = getRepository(Categorie);

  try {
    const categorie = await categorieRepo.findOne({
      where: { id },
      cache: true,
    });

    return resp.status(200).send(categorie);
  } catch (err) {
    throw new AppError("Error on get categorie", 400);
  }
});

categoriesRouter.post("/create", async (req, resp) => {
  const categorieRepo = getRepository(Categorie);

  const { name, iconName } = req.body;

  try {
    const allCategories = await categorieRepo.find({
      cache: true,
    });

    if (allCategories.length === 3) throw "Error, creation limit(3)";

    const categorie = categorieRepo.create({
      name,
      iconName,
    });

    await categorieRepo.save(categorie);

    return resp.status(200).send(categorie);
  } catch (err) {
    throw new AppError(err ? err : "Error on create categorie", 400);
  }
});

categoriesRouter.post("/update/:id", async (req, resp) => {
  const { id } = req.params;
  const { name, iconName } = req.body;

  const categorieRepo = getRepository(Categorie);

  try {
    await categorieRepo
      .createQueryBuilder()
      .update()
      .set({
        name,
        iconName,
      })
      .where("id = :id", { id })
      .execute();

    return resp.status(200).send();
  } catch {
    throw new AppError("Error on update categorie", 400);
  }
});

categoriesRouter.delete("/delete/:id", async (req, resp) => {
  const categorieRepo = getRepository(Categorie);

  const { id } = req.params;

  try {
    await categorieRepo.delete({ id });

    return resp.status(200).send();
  } catch (err) {
    throw new AppError("Error on delete categorie", 400);
  }
});

export default categoriesRouter;
