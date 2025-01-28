"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidations = void 0;
const zod_1 = require("zod");
const UserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, "First name is required")
        .max(20, "First name can not be more than 20 characters")
        .trim(),
    middleName: zod_1.z
        .string()
        .max(20, "Middle name can not be more than 20 characters")
        .trim()
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, "Last name is required")
        .max(20, "Last name can not be more than 20 characters")
        .trim(),
});
const UpdateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1, "First name is required")
        .max(20, "First name can not be more than 20 characters")
        .trim()
        .optional(),
    middleName: zod_1.z
        .string()
        .max(20, "Middle name can not be more than 20 characters")
        .trim()
        .optional(),
    lastName: zod_1.z
        .string()
        .min(1, "Last name is required")
        .max(20, "Last name can not be more than 20 characters")
        .trim()
        .optional(),
});
const LocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    occupation: zod_1.z.string().min(1, "Occupation is required"),
    contactNo: zod_1.z.string().min(1, "Contact number is required"),
    address: zod_1.z.string().min(1, "Address is required"),
});
const UpdateLocalGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    occupation: zod_1.z.string().min(1, "Occupation is required").optional(),
    contactNo: zod_1.z.string().min(1, "Contact number is required").optional(),
    address: zod_1.z.string().min(1, "Address is required").optional(),
});
const GuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, "Father's name is required"),
    fatherContactNo: zod_1.z.string().min(1, "Father's contact number is required"),
    fatherOccupation: zod_1.z.string().min(1, "Father's occupation is required"),
    motherName: zod_1.z.string().min(1, "Mother's name is required"),
    motherContactNo: zod_1.z.string().min(1, "Mother's contact number is required"),
    motherOccupation: zod_1.z.string().min(1, "Mother's occupation is required"),
});
const UpdateGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, "Father's name is required").optional(),
    fatherContactNo: zod_1.z
        .string()
        .min(1, "Father's contact number is required")
        .optional(),
    fatherOccupation: zod_1.z
        .string()
        .min(1, "Father's occupation is required")
        .optional(),
    motherName: zod_1.z.string().min(1, "Mother's name is required").optional(),
    motherContactNo: zod_1.z
        .string()
        .min(1, "Mother's contact number is required")
        .optional(),
    motherOccupation: zod_1.z
        .string()
        .min(1, "Mother's occupation is required")
        .optional(),
});
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, "Password must be at least 6 characters long")
            .max(20, "Password can not be more than 20 characters")
            .optional(),
        student: zod_1.z.object({
            name: UserNameValidationSchema,
            email: zod_1.z.string().email("Invalid email address"),
            gender: zod_1.z.enum(["male", "female", "other"]),
            dateOfBirth: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().min(1, "Contact number is required"),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, "Emergency contact number is required"),
            presentAddress: zod_1.z.string().min(1, "Present address is required"),
            permanentAddress: zod_1.z.string().min(1, "Permanent address is required"),
            guardian: GuardianValidationSchema,
            localGuardian: LocalGuardianValidationSchema,
            bloodGroup: zod_1.z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
            admissionSemester: zod_1.z.string(),
            academicDepartment: zod_1.z.string(),
        }),
    }),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6, "Password must be at least 6 characters long")
            .max(20, "Password can not be more than 20 characters")
            .optional(),
        student: zod_1.z.object({
            name: UpdateUserNameValidationSchema.optional(),
            email: zod_1.z.string().email("Invalid email address").optional(),
            profileImg: zod_1.z.string().optional(),
            gender: zod_1.z.enum(["male", "female", "other"]).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().min(1, "Contact number is required").optional(),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, "Emergency contact number is required")
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, "Present address is required")
                .optional(),
            permanentAddress: zod_1.z
                .string()
                .min(1, "Permanent address is required")
                .optional(),
            guardian: UpdateGuardianValidationSchema.optional(),
            localGuardian: UpdateLocalGuardianValidationSchema.optional(),
            bloodGroup: zod_1.z
                .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
                .optional(),
            admissionSemester: zod_1.z.string().optional(),
            academicDepartment: zod_1.z.string().optional(),
        }),
    }),
});
exports.StudentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
