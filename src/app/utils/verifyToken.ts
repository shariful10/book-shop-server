/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import { httpStatusCode } from "./httpStatusCode";
import AppError from "../errors/AppError";

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
  }
};
