import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImg?: string;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "user";
};

export interface UserModel extends Model<TUser> {
  // Checking if the user exist
  isUserExists(id: string): Promise<TUser>;

  // Checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
