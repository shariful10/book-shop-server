"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Faculty name is required",
            invalid_type_error: "Faculty name must be a string",
        }),
    }),
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Faculty name is required",
            invalid_type_error: "Faculty name must be a string",
        }),
    }),
});
exports.AcademicFacultyValidation = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
