import express from "express";
import multer from "multer";
import path from "path";

import conn from "../services/db";
import StorageMulter from "../configs/mullter";

const evaluationsRouter = express.Router();

const uploadAvatar = multer({
  storage: StorageMulter.StorageEvaluationsAvatars,
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

evaluationsRouter.get("/:id", (request, response) => {
  const { id } = request.params;

  conn.query(
    `SELECT * FROM evaluations WHERE place_id='${id}'`,
    (error, result) => {
      if (error) {
        return response.status(400).send({
          error,
          error_message: "Error on get evaluations",
        });
      } else if (Object.keys(result).length === 0) {
        return response.status(404).send(result);
      }

      return response.status(200).send(result);
    }
  );
});

evaluationsRouter.post("/create", (request, response) => {
  uploadAvatar(request, response, (err: String) => {
    if (err instanceof multer.MulterError) {
      return response.status(406).json(err);
    } else if (err) {
      return response.status(406).json(err);
    }

    const { place_id, name, description, rating } = request.body;

    const avatarPath = request.file.filename;
    const pathFile = `${process.env.HOST}evaluations/avatar/${avatarPath}`;

    conn.query(
      `INSERT INTO evaluations (place_id, name, avatar, description, rating) 
    VALUES ('${place_id}', '${name}', '${pathFile}', '${description}', '${rating}')`,
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on create the evaluations",
          });
        }

        return response.status(200).send({
          id: result.insertId,
          place_id,
          name,
          avatar: pathFile,
          description,
          rating,
        });
      }
    );
  });
});

evaluationsRouter.use(
  "/avatar",
  express.static(
    path.resolve(__dirname, "..", "uploads", "evaluations", "avatars")
  )
);

export default evaluationsRouter;
