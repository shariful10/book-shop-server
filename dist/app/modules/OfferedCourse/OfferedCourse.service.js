"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const course_model_1 = require("../Course/course.model");
const faculty_model_1 = require("../Faculty/faculty.model");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const student_model_1 = require("../student/student.model");
const OfferedCourse_model_1 = require("./OfferedCourse.model");
const OfferedCourse_utils_1 = require("./OfferedCourse.utils");
const createOfferedCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime, } = payload;
    //Check if the semester registration id is exists!
    const isSemesterRegistrationExits = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
        throw new AppError_1.default(404, "Semester registration not found!");
    }
    const academicSemester = isSemesterRegistrationExits.academicSemester;
    const isAcademicFacultyExits = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExits) {
        throw new AppError_1.default(404, "Academic Faculty not found !");
    }
    const isAcademicDepartmentExits = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExits) {
        throw new AppError_1.default(404, "Academic Department not found !");
    }
    const isCourseExits = yield course_model_1.Course.findById(course);
    if (!isCourseExits) {
        throw new AppError_1.default(404, "Course not found !");
    }
    const isFacultyExits = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExits) {
        throw new AppError_1.default(404, "Faculty not found !");
    }
    // Check if the department is belong to the  faculty
    const isDepartmentBelongToFaculty = yield academicDepartment_model_1.AcademicDepartment.findOne({
        _id: academicDepartment,
        academicFaculty,
    });
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(400, `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`);
    }
    // Check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = yield OfferedCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError_1.default(400, `Offered course with same section is already exist!`);
    }
    // Get the schedules of the faculties
    const assignedSchedules = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    if ((0, OfferedCourse_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppError_1.default(409, `This faculty is not available at that time! Choose other time or day`);
    }
    const result = yield OfferedCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const getAllOfferedCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourseQuery = new QueryBuilder_1.default(OfferedCourse_model_1.OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield offeredCourseQuery.modelQuery;
    const meta = yield offeredCourseQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getMyOfferedCoursesFromDB = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination setup
    const page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    const limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 10;
    const skip = (page - 1) * limit;
    const student = yield student_model_1.Student.findOne({ id: userId });
    if (!student) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "User is not found");
    }
    // Find current ongoing semester
    const currentOngoingRegistrationSemester = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        status: "ONGOING",
    });
    if (!currentOngoingRegistrationSemester) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "There is no ongoing semester registration!");
    }
    const aggregationQuery = [
        {
            $match: {
                semesterRegistration: currentOngoingRegistrationSemester === null || currentOngoingRegistrationSemester === void 0 ? void 0 : currentOngoingRegistrationSemester._id,
                academicFaculty: student.academicFaculty,
                academicDepartment: student.academicDepartment,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $unwind: "$course",
        },
        {
            $lookup: {
                from: "enrolledcourses",
                let: {
                    currentOngoingRegistrationSemester: currentOngoingRegistrationSemester === null || currentOngoingRegistrationSemester === void 0 ? void 0 : currentOngoingRegistrationSemester._id,
                    currentStudent: student._id,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$semesterRegistration",
                                            "$$currentOngoingRegistrationSemester",
                                        ],
                                    },
                                    {
                                        $eq: ["$student", "$$currentStudent"],
                                    },
                                    {
                                        $eq: ["$isEnrolled", true],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "enrolledCourses",
            },
        },
        {
            $lookup: {
                from: "enrolledcourses",
                let: {
                    currentStudent: student._id,
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$student", "$$currentStudent"],
                                    },
                                    {
                                        $eq: ["$isCompleted", true],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "completedCourses",
            },
        },
        {
            $addFields: {
                completedCourseIds: {
                    $map: {
                        input: "$completedCourses",
                        as: "completed",
                        in: "$$completed.course",
                    },
                },
            },
        },
        {
            $addFields: {
                isPreRequisitesFulfilled: {
                    $or: [
                        { $eq: ["$course.preRequisiteCourses", []] },
                        {
                            $setIsSubset: [
                                "$course.preRequisiteCourses.course",
                                "$completedCourseIds",
                            ],
                        },
                    ],
                },
                isAlreadyEnrolled: {
                    $in: [
                        "$course._id",
                        {
                            $map: {
                                input: "$enrolledCourses",
                                as: "enroll",
                                in: "$$enroll.course",
                            },
                        },
                    ],
                },
            },
        },
        {
            $match: {
                isAlreadyEnrolled: false,
                isPreRequisitesFulfilled: true,
            },
        },
    ];
    const PaginationQuery = [
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ];
    const result = yield OfferedCourse_model_1.OfferedCourse.aggregate([
        ...aggregationQuery,
        ...PaginationQuery,
    ]);
    const total = (yield OfferedCourse_model_1.OfferedCourse.aggregate(aggregationQuery)).length;
    const totalPage = Math.ceil(result.length / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        result,
    };
});
const getSingleOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offeredCourse = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    if (!offeredCourse) {
        throw new AppError_1.default(404, "Offered Course not found");
    }
    return offeredCourse;
});
const updateOfferedCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(404, "Offered course not found !");
    }
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError_1.default(404, "Faculty not found !");
    }
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    // get the schedules of the faculties
    // Checking the status of the semester registration
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== "UPCOMING") {
        throw new AppError_1.default(400, `You can not update this offered course as it is ${semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status}`);
    }
    // check if the faculty is available at that time.
    const assignedSchedules = yield OfferedCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select("days startTime endTime");
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    if ((0, OfferedCourse_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppError_1.default(409, `This faculty is not available at that time ! Choose other time or day`);
    }
    const result = yield OfferedCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteOfferedCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isOfferedCourseExists = yield OfferedCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(404, "Offered Course not found");
    }
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration).select("status");
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== "UPCOMING") {
        throw new AppError_1.default(400, `Offered course can not update! because the semester ${semesterRegistrationStatus}`);
    }
    const result = yield OfferedCourse_model_1.OfferedCourse.findByIdAndDelete(id);
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getMyOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
};
