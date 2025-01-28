"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidations = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Academic Department is required",
            invalid_type_error: "Academic Department must be a string",
        }),
        academicFaculty: zod_1.z.string({
            required_error: "Academic Faculty is required",
            invalid_type_error: "Academic Faculty must be a string",
        }),
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Academic Department must be a string",
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            invalid_type_error: "Academic Faculty must be a string",
        })
            .optional(),
    }),
});
exports.AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};
