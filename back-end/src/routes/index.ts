import express from "express";

import citiesRouter from "./citiesRouter";
import placesRouter from "./placesRouter";
import categoriesRouter from "./categoriesRouter";
import evaluationsRouter from "./evaluationsRouter";
import usersRouter from "./usersRouter";

const routes = express.Router();

routes.use("/cities", citiesRouter);
routes.use("/places", placesRouter);
routes.use("/categories", categoriesRouter);
routes.use("/evaluations", evaluationsRouter);
routes.use("/users", usersRouter);

export default routes;
