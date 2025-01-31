import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUploadedFile } from "../../interface/file";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { createToken } from "../auth/auth.utils";
import { searchableFields } from "./user.const";
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

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findById(userId).select("-password");

  if (!result) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  return result;
};

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select("-password");
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  return null;
};

const updateUserFromDB = async (
  file: TUploadedFile,
  userId: string,
  updatedData: Partial<TUser>,
) => {
  if (file) {
    // Send image to Cloudinary
    const imageName = `${updatedData?.email}${updatedData?.name}`;
    const path = file?.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    updatedData.profileImg = secure_url as string;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  // Check the book is exists or not
  if (!updatedUser) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getMeFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
