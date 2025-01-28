import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import { httpStatusCode } from "../utils/httpStatusCode";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, _res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = req.headers.authorization?.split(" ")[1].trim();
    }

    // If the token send from the client
    if (!token) {
      throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
    }

    // Check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwtAccessSecret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.isUserExists(email);

    // Checking if the user is exist
    if (!user) {
      throw new AppError(httpStatusCode.NOT_FOUND, "User not found!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
