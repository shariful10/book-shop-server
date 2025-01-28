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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const httpStatusCode_1 = require("../utils/httpStatusCode");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // If the token send from the client
        if (!token) {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
        }
        // Check if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtAccessSecret);
        const { role, userId, iat } = decoded;
        const user = yield user_model_1.User.isUserExistsByCustomId(userId);
        // Checking if the user is exist
        if (!user) {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "User not found!");
        }
        // Checking if the user already deleted
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "This user is already deleted!");
        }
        // Checking if the user is blocked
        const userStatus = user === null || user === void 0 ? void 0 : user.status;
        if (userStatus === "blocked") {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "This user is blocked!");
        }
        if (user.passwordChangedAt &&
            user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
