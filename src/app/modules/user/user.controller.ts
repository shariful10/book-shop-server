import config from "../../config";
import { TUploadedFile } from "../../interface/file";
import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(
    req.file as TUploadedFile,
    req.body,
  );

  const { refreshToken, accessToken, user } = result;

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImg: user.profileImg,
  };

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    message: "User is created successfully!",
    data: userData,
    accessToken: accessToken,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Users are retrieved successfully!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
