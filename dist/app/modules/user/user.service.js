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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_utils_1 = require("../auth/auth.utils");
const user_model_1 = require("./user.model");
const createUserIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        // Send image to Cloudinary
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.email}${payload === null || payload === void 0 ? void 0 : payload.name}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.profileImg = secure_url;
    }
    const user = yield user_model_1.User.create(payload);
    const jwtPayload = {
        email: payload.email,
        role: payload.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtAccessSecret, config_1.default.jwtAccessExpiresIn);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwtRefreshSecret, config_1.default.jwtRefreshExpiresIn);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select("-password");
    return result;
});
const getSingleUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email }).select("-password");
    if (!result) {
        throw new Error("User not found");
    }
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
};
