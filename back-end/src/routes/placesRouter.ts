import express from "express";
import multer from "multer";
import path from "path";

import fs from "fs";
import { promisify } from "util";

const unlinkAsyncPlaceImage = promisify(fs.unlink);

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

const uploadImage = multer({
  storage: StorageMulter.StoragePlacesImage,
  limits: { fileSize: 4000000 }, // 4 MB
  fileFilter: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const typePermit = ["png", "jpg", "jpeg"];
    if (!typePermit.includes(ext)) {
      cb("Type not allowed!", false);
    }
    cb(null, true);
  },
}).single("place-image");

const placesRouter = express.Router();

placesRouter.get("/:id", (request, response) => {
  const { id } = request.params;

  conn.query(`SELECT * FROM places WHERE city_id='${id}'`, (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on get places",
      });
    }

    return response.status(200).send(result);
  });
});

placesRouter.post("/update/:id", (request, response) => {
  uploadImage(request, response, async (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { id } = request.params;
    const {
      name,
      name_last_image,
      description,
      phone_number,
      address,
    } = request.body;

    if (!name || !name_last_image || !description || !phone_number || !address)
      return response.status(400).send({
        error: "Error, missing fields",
      });

    const pathFolderPlacesImage = path.resolve(
      __dirname,
      "..",
      "uploads",
      "places",
      name_last_image
    );

    try {
      await unlinkAsyncPlaceImage(pathFolderPlacesImage);
    } catch {
      return response.status(400).send({
        error: "Error on delete image",
      });
    }

    const imageName = request.file.filename;
    const pathFile = `${process.env.HOST}places/images/${imageName}`;

    conn.query(
      `UPDATE places SET name='${name}', image='${pathFile}', description='${description}', phone_number='${phone_number}', address='${address}' WHERE id=${id}`,
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on update place",
          });
        }

        return response.status(200).send();
      }
    );
  });
});

placesRouter.post("/create/:id", (request, response) => {
  uploadImage(request, response, (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { id: city_id } = request.params;
    let { name, description, phone_number, address } = request.body;

    if (!phone_number) {
      phone_number = null;
    }

    const imagePath = request.file.filename;
    const pathFile = `${process.env.HOST}places/images/${imagePath}`;

    conn.query(
      `INSERT INTO places (city_id, name, image, description, phone_number, address) 
    VALUES ('${city_id}', '${name}', '${pathFile}', '${description}', '${phone_number}', '${address}')`,
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on insert places",
          });
        }

        return response.status(200).send();
      }
    );
  });
});

placesRouter.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "uploads", "places"))
);

export default placesRouter;
