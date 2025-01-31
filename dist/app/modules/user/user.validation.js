"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
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
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .max(25)
            .optional(),
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().min(6).optional(),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
