"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const createUserValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be a string",
    })
        .max(20, "Password can not be more than 20 characters")
        .optional(),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_const_1.UserStatus], {
            required_error: "Status is required",
            invalid_type_error: "Status must be a string",
        }),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
    changeStatusValidationSchema,
};
