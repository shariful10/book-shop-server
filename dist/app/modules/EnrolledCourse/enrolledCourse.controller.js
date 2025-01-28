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
exports.EnrolledCourseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const enrolledCourse_service_1 = require("./enrolledCourse.service");
const createEnrolledCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield enrolledCourse_service_1.EnrolledCourseServices.createEnrolledCourseIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Student is enrolled successfully!",
        data: result,
    });
}));
const getMyEnrolledCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.user.userId;
    const result = yield enrolledCourse_service_1.EnrolledCourseServices.getMyEnrolledCoursesFromDB(studentId, req.query);
    (0, sendResponse_1.default)(res, {
        message: "Enrolled courses are retrieved successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const updateEnrolledCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyId = req.user.userId;
    const result = yield enrolledCourse_service_1.EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(facultyId, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Marks is updated successfully!",
        data: result,
    });
}));
exports.EnrolledCourseControllers = {
    createEnrolledCourse,
    getMyEnrolledCourses,
    updateEnrolledCourse,
};
