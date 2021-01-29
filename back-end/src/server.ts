import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import Routers from "./routes";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Routers);

app.get("/", (request, response) => {
  return response.json({
    message: "Hello World",
  });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
