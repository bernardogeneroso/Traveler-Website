import express from "express";

import citiesRouter from "./citiesRouter";
import placesRouter from "./placesRouter";
import evaluationsRouter from "./evaluationsRouter";

const routes = express.Router();

routes.use("/cities", citiesRouter);
routes.use("/places", placesRouter);
routes.use("/evaluations", evaluationsRouter);

export default routes;
