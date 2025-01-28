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
exports.OfferedCourseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const OfferedCourse_service_1 = require("./OfferedCourse.service");
const createOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_service_1.OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Offered Course is created successfully !",
        data: result,
    });
}));
const getAllOfferedCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_service_1.OfferedCourseServices.getAllOfferedCoursesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        message: "Offered Courses are retrieved successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const getMyOfferedCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield OfferedCourse_service_1.OfferedCourseServices.getMyOfferedCoursesFromDB(userId, req.query);
    (0, sendResponse_1.default)(res, {
        message: "My Offered Courses are retrieved successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleOfferedCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield OfferedCourse_service_1.OfferedCourseServices.getSingleOfferedCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        message: "Offered Course is fetched successfully!",
        data: result,
    });
}));
const updateOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield OfferedCourse_service_1.OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Offered Course is updated successfully",
        data: result,
    });
}));
const deleteOfferedCourseFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield OfferedCourse_service_1.OfferedCourseServices.deleteOfferedCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        message: "Offered Course is deleted successfully",
        data: result,
    });
}));
exports.OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getMyOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
    deleteOfferedCourseFromDB,
};
