import express from "express";
import multer from "multer";
import path from "path";

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

const citiesRouter = express.Router();

const uploadCityImage = multer({
  storage: StorageMulter.StorageCitiesImage,
  limits: { fileSize: 4000000 }, // 4 MB
  fileFilter: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const typePermit = ["png", "jpg", "jpeg"];
    if (!typePermit.includes(ext)) {
      cb("Type not allowed!", false);
    }
    cb(null, true);
  },
}).single("city-image");

citiesRouter.get("/", (request, response) => {
  conn.query("SELECT * FROM cities", (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on get cities",
      });
    }

    response.status(200).send(result);
  });
});

citiesRouter.post("/create", (request, response) => {
  uploadCityImage(request, response, (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { name, description } = request.body;

    const imageCityPath = request.file.filename;
    const pathFile = `${process.env.HOST}cities/image/${imageCityPath}`;

    conn.query(
      `INSERT INTO cities (name, image, description) 
    VALUES ('${name}', '${pathFile}', '${description}')`,
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on create a city",
          });
        }

        return response.status(200).send();
      }
    );
  });
});

citiesRouter.use(
  "/image",
  express.static(path.resolve(__dirname, "..", "uploads", "cities"))
);

export default citiesRouter;
