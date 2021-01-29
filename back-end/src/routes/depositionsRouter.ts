import express from "express";
import multer from "multer";
import path from "path";

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

const depositionsRouter = express.Router();

const uploadAvatar = multer({
  storage: StorageMulter.StorageDepositionsAvatars,
  limits: { fileSize: 4000000 }, // 4 MB
  fileFilter: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const typePermit = ["png", "jpg", "jpeg"];
    if (!typePermit.includes(ext)) {
      cb("Type not allowed!", false);
    }
    cb(null, true);
  },
}).single("avatar");

depositionsRouter.get("/:id", (request, response) => {
  const { id } = request.params;

  conn.query(
    `SELECT * FROM depositions WHERE place_id='${id}'`,
    (error, result) => {
      if (error) {
        return response.status(400).send({
          error,
          error_message: "Error on get depositions",
        });
      } else if (Object.keys(result).length === 0) {
        return response.status(404).send(result);
      }

      return response.status(200).send(result);
    }
  );
});

depositionsRouter.post("/create", (request, response) => {
  uploadAvatar(request, response, (err: String) => {
    console.log(err);
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { city_id, place_id, name, description } = request.body;

    const avatarPath = request.file.filename;
    const pathFile = `${process.env.HOST}despositions/avatar/${avatarPath}`;

    conn.query(
      `INSERT INTO depositions (city_id, place_id, name, avatar, description) 
    VALUES ('${city_id}', '${place_id}', '${name}', '${pathFile}', '${description}')`,
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on get depositions",
          });
        }

        return response.status(200).send(result);
      }
    );
  });
});

depositionsRouter.use(
  "/avatar",
  express.static(
    path.resolve(__dirname, "..", "uploads", "despositions", "avatars")
  )
);

export default depositionsRouter;
