import express from "express";
import multer from "multer";
import path from "path";

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

import fs from "fs";
import { promisify } from "util";

const unlinkAsyncCityImage = promisify(fs.unlink);

const citiesRouter = express.Router();

const uploadCityImage = multer({
  storage: StorageMulter.StorageCitiesImage,
  limits: { fileSize: 4000000 }, // 4 MB
  fileFilter: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const typePermit = ["png", "jpg", "jpeg"];
    if (!typePermit.includes(ext)) {
      // @ts-ignore
      cb("Type not allowed!", false);
    }
    cb(null, true);
  },
}).single("city-image");

citiesRouter.get("/", (request, response) => {
  let { limit, search } = request.query;

  !limit ? (limit = "") : (limit = `LIMIT ${limit}`);
  !search
    ? (search = "")
    : (search = `, IF(locate('${search}',name)>0, TRUE, FALSE) AS "opacity"`);

  conn.query(`SELECT *${search} FROM cities ${limit}`, (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on get cities",
      });
    }

    response.status(200).send(result);
  });
});

citiesRouter.get("/:id", (request, response) => {
  const { id } = request.params;

  conn.query(`SELECT * FROM cities WHERE id='${id}'`, (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on get city",
      });
    }

    if (!result[0]) response.status(404).send();

    response.status(200).send(result[0]);
  });
});

citiesRouter.post("/update/:id", (request, response) => {
  uploadCityImage(request, response, (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { id } = request.params;
    const { name, description } = request.body;

    if (!name || !description)
      return response.status(400).send({
        error: "Error, missing fields",
      });

    try {
      const imageName = request.file.filename;

      conn.query(
        `SELECT image FROM cities WHERE id=?`,
        [id],
        async (error, result) => {
          if (error) {
            return response.status(400).send({
              error,
              error_message: "Error on update city",
            });
          }

          const pathFolderCitiesImage = path.resolve(
            __dirname,
            "..",
            "uploads",
            "cities",
            result[0].image.split("image/")[1]
          );

          try {
            await unlinkAsyncCityImage(pathFolderCitiesImage);
          } catch {
            return response.status(400).send({
              error: "Error on delete image",
            });
          }

          const pathFile = `${process.env.HOST}cities/image/${imageName}`;

          conn.query(
            `UPDATE cities SET name=?, image=?, description=? WHERE id=?`,
            [name, pathFile, description, id],
            (error, result) => {
              if (error) {
                return response.status(400).send({
                  error,
                  error_message: "Error on update city",
                });
              }

              return response.status(200).send();
            }
          );
        }
      );
    } catch (err) {
      conn.query(
        `UPDATE cities SET name=?, description=? WHERE id=?`,
        [name, description, id],
        (error, result) => {
          if (error) {
            return response.status(400).send({
              error,
              error_message: "Error on update city",
            });
          }

          return response.status(200).send();
        }
      );
    }
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

        return response.status(200).send({
          id: result.insertId,
          image: pathFile,
        });
      }
    );
  });
});

citiesRouter.delete("/remove/:id", (request, response) => {
  const { id } = request.params;

  conn.query(`DELETE FROM cities WHERE id=?`, [id], (error, result) => {
    if (error) {
      return response.status(400).send({
        error,
        error_message: "Error on delete a city",
      });
    }

    return response.status(200).send();
  });
});

citiesRouter.use(
  "/image",
  express.static(path.resolve(__dirname, "..", "uploads", "cities"))
);

export default citiesRouter;
