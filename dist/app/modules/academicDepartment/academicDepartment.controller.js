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
exports.AcademicDepartmentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        message: "Academic department created successfully",
        data: result,
    });
}));
const getAllAcademicDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.getAllAcademicFDepartmentsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        message: "Academic department are retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    (0, sendResponse_1.default)(res, {
        message: "Academic department is retrieved successfully",
        data: result,
    });
}));
const updateAcademicDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const result = yield academicDepartment_service_1.AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Academic department is updated successfully",
        data: result,
    });
}));
exports.AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
