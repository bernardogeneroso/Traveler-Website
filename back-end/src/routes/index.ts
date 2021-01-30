import express from "express";

import citiesRouter from "./citiesRouter";
import placesRouter from "./placesRouter";
import depositionsRouter from "./depositionsRouter";

const routes = express.Router();

routes.use("/cities", citiesRouter);
routes.use("/places", placesRouter);
routes.use("/depositions", depositionsRouter);

export default routes;
