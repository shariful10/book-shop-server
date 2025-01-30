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
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Users are retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "User is retrieved successfully",
    data: result,
  });
});

// const updateUser = catchAsync(async (req, res) => {
//   const { id: userId } = req.params;
//   const user = req.body;
//   const result = await UserServices.updateUserIntoDB(userId, user);

//   sendResponse(res, {
//     statusCode: httpStatusCode.OK,
//     message: "User is updated successfully",
//     data: result,
//   });
// });

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "User is deleted successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await UserServices.getMeFromDB(email);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "User is retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  getMe,
};
