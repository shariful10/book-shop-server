"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCode_1 = require("./httpStatusCode");
const AppError_1 = __importDefault(require("../errors/AppError"));
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized");
    }
};
exports.verifyToken = verifyToken;
