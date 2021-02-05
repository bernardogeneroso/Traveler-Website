import express from "express";
import multer from "multer";
import path from "path";

import fs from "fs";
import { promisify } from "util";

const unlinkAsyncPlaceImage = promisify(fs.unlink);

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

interface PlaceProps {
  id: number;
  city_id: number;
  name: string;
  description: string;
  phone_number: number | null;
  address: string;
  rating: number;
  category: number;
}

const uploadImage = multer({
  storage: StorageMulter.StoragePlacesImage,
  limits: { fileSize: 8000000 }, // 8 MB
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

placesRouter.get("/", (request, response) => {
  let { id, category, limit } = request.query;

  !id ? (id = "1") : (id = `city_id='${id}'`);
  !category ? (category = "") : (category = `AND category=${category}`);
  !limit
    ? (limit = "")
    : (limit = `GROUP BY rating ORDER BY rating DESC LIMIT ${limit}`);

  conn.query(
    `SELECT * FROM places WHERE ${id} ${category} ${limit}`,
    (error, result) => {
      if (error) {
        return response.status(400).send({
          error,
          error_message: "Error on get places",
        });
      }

      const handleRating = result.map((place: PlaceProps) => {
        const rating = place.rating.toString().split(".");
        if (rating.length === 2) {
          return {
            ...place,
            rating: `${rating[0]},${rating[1]}`,
          };
        }

        return {
          ...place,
          rating: `${rating[0]},0`,
        };
      });

      return response.status(200).send(handleRating);
    }
  );
});

placesRouter.get("/:id", (request, response) => {
  const { id } = request.params;

  conn.query(`SELECT * FROM places WHERE id='${id}'`, (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on get place",
      });
    }

    if (!result[0]) response.status(404).send();

    return response.status(200).send(result[0]);
  });
});

placesRouter.post("/update/:id", (request, response) => {
  uploadImage(request, response, (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { id } = request.params;
    const {
      name,
      description,
      phone_number,
      address,
      category,
      rating,
    } = request.body;

    if (
      !name ||
      !description ||
      !phone_number ||
      !address ||
      !category ||
      !rating
    )
      return response.status(400).send({
        error: "Error, missing fields",
      });

    conn.query(
      `SELECT image FROM places WHERE id=${id}`,
      async (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on update place",
          });
        }

        const pathFolderPlacesImage = path.resolve(
          __dirname,
          "..",
          "uploads",
          "places",
          result[0].image.split("images/")[1]
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
          `UPDATE places SET name='${name}', image='${pathFile}', description='${description}', phone_number='${phone_number}', address='${address}', category='${category}', rating='${rating}' WHERE id=${id}`,
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
    let {
      name,
      description,
      phone_number,
      address,
      rating,
      category,
    } = request.body;

    const imagePath = request.file.filename;
    const pathFile = `${process.env.HOST}places/images/${imagePath}`;

    conn.query(
      `INSERT INTO places (city_id, name, image, description, phone_number, address, rating, category) 
    VALUES ('${city_id}', '${name}', '${pathFile}', '${description}', ?, '${address}', '${rating}', '${category}')`,
      [phone_number],
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
