"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationValidations = void 0;
const zod_1 = require("zod");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const createSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string({
            required_error: "Academic Semester is required",
        }),
        status: zod_1.z.enum([...semesterRegistration_constant_1.SemesterRegistrationStatus]),
        startDate: zod_1.z
            .string({
            required_error: "Start date is required",
            invalid_type_error: "Start date must be in a date formate",
        })
            .datetime(),
        endDate: zod_1.z
            .string({
            required_error: "End date is required",
            invalid_type_error: "End date must be in a date formate",
        })
            .datetime(),
        minCredit: zod_1.z.number({ invalid_type_error: "Min credit must be a number" }),
        maxCredit: zod_1.z.number({ invalid_type_error: "Max credit must be a number" }),
    }),
});
const updateSemesterRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([...semesterRegistration_constant_1.SemesterRegistrationStatus])
            .optional(),
        startDate: zod_1.z
            .string({
            invalid_type_error: "Start date must be in a date formate",
        })
            .datetime()
            .optional(),
        endDate: zod_1.z
            .string({
            invalid_type_error: "End date must be in a date formate",
        })
            .datetime()
            .optional(),
        minCredit: zod_1.z
            .number({ invalid_type_error: "Min credit must be a number" })
            .optional(),
        maxCredit: zod_1.z
            .number({ invalid_type_error: "Max credit must be a number" })
            .optional(),
    }),
});
exports.SemesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
};
