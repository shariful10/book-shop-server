"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendEmail_1 = require("../../utils/sendEmail");
const validateUser_1 = require("../../utils/validateUser");
const user_model_1 = require("../user/user.model");
const user_utils_1 = require("../user/user.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, validateUser_1.validateUser)(payload === null || payload === void 0 ? void 0 : payload.email);
    // Checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user.password))) {
        // Access granted: Send Access token & Refresh token
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "Password is incorrect!");
    }
    // Create token
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "30d" });
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, { expiresIn: "60d" });
    return {
        accessToken,
        refreshToken,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExists(userData.email);
    if (!user) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "This user is not found !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "Password do not matched!");
    // Hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcryptSaltRounds));
    yield user_model_1.User.findOneAndUpdate({
        email: userData.email,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsChangePassword: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the token is valid
    const decoded = (0, user_utils_1.verifyToken)(token, config_1.default.jwtRefreshSecret);
    const { email, iat } = decoded;
    const user = yield (0, validateUser_1.validateUser)(email);
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "30d" });
    return {
        accessToken,
    };
});
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, validateUser_1.validateUser)(userId);
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const resetToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, {
        expiresIn: config_1.default.jwtAccessExpiresIn,
    });
    const resetUILink = `${config_1.default.resetPassUILink}?id=${user.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetUILink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, validateUser_1.validateUser)(payload.email);
    // Check if the token is valid
    const decoded = (0, user_utils_1.verifyToken)(token, config_1.default.jwtAccessSecret);
    if (user.email !== decoded.email) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "You are not forbidden!");
    }
    // Hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcryptSaltRounds));
    yield user_model_1.User.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role,
    }, {
        password: newHashedPassword,
        needsChangePassword: false,
        passwordChangedAt: new Date(),
    });
});
exports.AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
