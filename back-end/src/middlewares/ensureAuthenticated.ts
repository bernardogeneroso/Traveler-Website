import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    response.status(401).send({
      error: "JWT token is missing",
    });

  // @ts-ignore
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;

    // @ts-ignore
    request.user = { id: sub };

    return next();
  } catch {
    response.status(401).send({
      error: "JWT token is missing",
    });
  }
};

export default ensureAuthenticated;
