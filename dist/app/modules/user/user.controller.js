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
exports.UserControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    const result = yield user_service_1.UserServices.createStudentIntoDB(req.file, password, studentData);
    (0, sendResponse_1.default)(res, {
        message: "Student is created successfully",
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    const result = yield user_service_1.UserServices.createFacultyIntoDB(req.file, password, facultyData);
    (0, sendResponse_1.default)(res, {
        message: "Faculty is created successfully",
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserServices.createAdminIntoDB(req.file, password, adminData);
    (0, sendResponse_1.default)(res, {
        message: "Admin is created successfully",
        data: result,
    });
}));
const changeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserServices.changeStatusIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        message: "User status changed successfully!",
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.user;
    const result = yield user_service_1.UserServices.getMeFromDB(userId, role);
    (0, sendResponse_1.default)(res, {
        message: "User is retrieved successfully",
        data: result,
    });
}));
exports.UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    changeStatus,
    getMe,
};
