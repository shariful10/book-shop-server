"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Id is required.",
            invalid_type_error: "ID must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
            invalid_type_error: "Old password must be a string",
        }),
        newPassword: zod_1.z.string({
            required_error: "New password is required",
            invalid_type_error: "New password must be a string",
        }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "User id is required!",
        }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "User id is required!",
        }),
        newPassword: zod_1.z.string({
            required_error: "New password is required",
            invalid_type_error: "New password must be a string",
        }),
    }),
});
exports.AuthValidations = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    resetPasswordValidationSchema,
    changePasswordValidationSchema,
    forgetPasswordValidationSchema,
};
