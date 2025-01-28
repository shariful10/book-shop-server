import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { httpStatusCode } from "./httpStatusCode";

export const validateUser = async (email: string) => {
  const user = await User.isUserExists(email);

  // Checking if the user exists
  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  return user;
};
