import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { sendEmail } from "../../utils/sendEmail";
import { validateUser } from "../../utils/validateUser";
import { User } from "../user/user.model";
import { TLoginUser, TResetPassword } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const user = await validateUser(payload?.email);

  // Checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    // Access granted: Send Access token & Refresh token
    throw new AppError(httpStatusCode.FORBIDDEN, "Password is incorrect!");
  }

  // Create token
  const jwtPayload = {
    email: user.email,
    role: user.role,
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
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExists(userData.email);

  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatusCode.FORBIDDEN, "Password do not matched!");

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSaltRounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsChangePassword: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // Check if the token is valid
  const decoded = verifyToken(token, config.jwtRefreshSecret as string);

  const { email, iat } = decoded;

  const user = await validateUser(email);

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatusCode.UNAUTHORIZE, "You are not authorized");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await validateUser(userId);

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    "10m",
  );

  const resetUILink = `${config.resetPassUILink}?id=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (payload: TResetPassword, token: string) => {
  const user = await validateUser(payload.email);

  // Check if the token is valid
  const decoded = verifyToken(token, config.jwtAccessSecret as string);

  if (user.email !== decoded.email) {
    throw new AppError(httpStatusCode.FORBIDDEN, "You are not forbidden!");
  }

  // Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSaltRounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsChangePassword: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
