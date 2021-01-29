import express from "express";

import depositionsRouter from "./depositionsRouter";

const routes = express.Router();

routes.use("/depositions", depositionsRouter);

export default routes;
