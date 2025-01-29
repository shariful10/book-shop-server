"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        message: data === null || data === void 0 ? void 0 : data.message,
        meta: data.meta,
        data: data === null || data === void 0 ? void 0 : data.data,
        accessToken: data.accessToken,
    });
};
exports.default = sendResponse;
