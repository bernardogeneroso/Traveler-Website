import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import conn from "../services/db";
import authenticateToken from "../middlewares/authenticateToken";

const usersRouter = express.Router();

usersRouter.post("/create", (request, response) => {
  const { email, password } = request.body;

  try {
    const createPassword = bcrypt.hashSync(password, 10);

    conn.query(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, createPassword],
      (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on create user",
          });
        }

        response.status(200).send({
          id: result.insertId,
          email,
        });
      }
    );
  } catch {
    response.status(400).send();
  }
});

usersRouter.post("/sessions", (request, response) => {
  const { email, password } = request.body;

  try {
    conn.query(
      `SELECT * FROM users WHERE email=?`,
      [email],
      async (error, result) => {
        if (error) {
          return response.status(400).send({
            error,
            error_message: "Error on get data of user",
          });
        }

        if (!result[0])
          return response.status(400).send({
            error_message: "Error on authentication",
          });

        const user = result[0];

        const secret = process.env.ACCESS_TOKEN_SECRET || "somethinglol";
        const expiresIn = "1d";

        const token = jwt.sign({ user_id: user.id }, secret, { expiresIn });

        const passwordCheck = await bcrypt.compareSync(password, user.password);

        if (!passwordCheck) {
          response.status(400).send({
            error_message: "Error on authentication",
          });
        }

        delete user.password;

        response.status(200).send({
          user,
          token,
        });
      }
    );
  } catch {
    response.status(400).send();
  }
});

usersRouter.get(
  "/sessions/validate",
  authenticateToken,
  (request, response) => {
    response.status(200).send();
  }
);

export default usersRouter;
