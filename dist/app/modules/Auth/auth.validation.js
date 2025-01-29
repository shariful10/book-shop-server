"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required.",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
    }),
});
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .max(25),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        role: zod_1.z.enum(["user", "admin", "superAdmin"]).optional().default("user"),
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
    createUserValidationSchema,
};
