import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const authenticateToken = (
  req: Request,
  resp: Response,
  nextFunction: NextFunction
) => {
  const authHeader = req.params.authorization;
  if (!authHeader) return resp.status(401).send("JWT token is missing");

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "somethinglol"
    );
    // @ts-ignore
    const { user_id } = decoded;

    // @ts-ignore
    resp.user = { id: user_id };

    return nextFunction();
  } catch {
    resp.status(401).send("Invalid JWT token");
  }
};

export default authenticateToken;
