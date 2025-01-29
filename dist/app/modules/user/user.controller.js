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
exports.UserControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createUserIntoDB(req.file, req.body);
    const { refreshToken, accessToken, user } = result;
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg,
    };
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.CREATED,
        message: "User is created successfully!",
        data: userData,
        accessToken: accessToken,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: httpStatusCode_1.httpStatusCode.OK,
        message: "Users are retrieved successfully!",
        data: result,
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
};
