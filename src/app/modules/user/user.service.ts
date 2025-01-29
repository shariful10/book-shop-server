import config from "../../config";
import { TUploadedFile } from "../../interface/file";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { createToken } from "../auth/auth.utils";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (file: TUploadedFile, payload: TUser) => {
  if (file) {
    // Send image to Cloudinary
    const imageName = `${payload?.email}${payload?.name}`;
    const path = file?.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.profileImg = secure_url as string;
  }

  const user = await User.create(payload);

  const jwtPayload = {
    email: payload.email,
    role: payload.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpiresIn as string,
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select("-password");
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select("-password");

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
