import express from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../database/entity/User";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";

const usersRouter = express.Router();

usersRouter.post("/create", async (req, resp) => {
  const userRepo = getRepository(User);

  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = userRepo.create({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await userRepo.save(user);

    return resp.status(200).send(user);
  } catch (err) {
    throw new AppError(err, 400);
  }
});

usersRouter.get("/session", async (req, resp) => {
  const { email, password } = req.body;

  const userRepo = getRepository(User);

  const user = await userRepo.findOne({ email });
  if (!user) throw new AppError("User unauthorized", 401);

  const hashedPassword = user.password;
  const comparePasswords = bcrypt.compareSync(password, hashedPassword);

  if (!comparePasswords) throw new AppError("User unauthorized", 401);

  // @ts-ignore
  delete user.password;

  const secret = process.env.ACCESS_TOKEN_SECRET || "somethinglol";

  const expiresIn = authConfig.jwt.expiresIn;
  // @ts-ignore
  const token = jwt.sign({ user_id: user.id }, secret, { expiresIn });

  return resp.status(200).send({
    user,
    token,
  });
});

export default usersRouter;
