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
exports.validateUser = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const httpStatusCode_1 = require("./httpStatusCode");
const validateUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomId(userId);
    // Checking if the user exists
    if (!user) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "User not found!");
    }
    // Checking if the user is already deleted
    if (user.isDeleted) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "This user is already deleted!");
    }
    // Checking if the user is blocked
    if (user.status === "blocked") {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "This user is blocked!");
    }
    return user;
});
exports.validateUser = validateUser;
