"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = exports.createCourseValidationSchema = void 0;
const zod_1 = require("zod");
const preRequisiteCoursesSchema = zod_1.z.object({
    course: zod_1.z.string({
        required_error: "Course is required",
        invalid_type_error: "Course must be a string",
    }),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
exports.createCourseValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Title cannot be empty"),
    prefix: zod_1.z.string({
        required_error: "Prefix is required",
        invalid_type_error: "Prefix must be a string",
    }),
    code: zod_1.z
        .number({
        required_error: "Code is required",
        invalid_type_error: "Code must be a number",
    })
        .int("Code must be an integer")
        .nonnegative("Code must be non-negative"),
    credits: zod_1.z
        .number({
        required_error: "Credits is required",
        invalid_type_error: "Credits must be a number",
    })
        .int("Credits must be an integer")
        .positive("Credits must be a positive value"),
    preRequisiteCourses: zod_1.z.array(preRequisiteCoursesSchema, {
        required_error: "Pre-requisite courses is required",
        invalid_type_error: "Pre-requisite courses must be an array",
    }),
});
exports.CourseValidations = {
    createCourseValidationSchema: exports.createCourseValidationSchema,
};
