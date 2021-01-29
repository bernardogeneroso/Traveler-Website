import express from "express";

import depositionsRouter from "./depositionsRouter";
import citiesRouter from "./citiesRouter";

const routes = express.Router();

routes.use("/depositions", depositionsRouter);
routes.use("/cities", citiesRouter);

export default routes;
