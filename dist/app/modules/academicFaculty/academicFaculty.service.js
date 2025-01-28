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
exports.AcademicFacultyServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFacultyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
});
const getAllAcademicFacultiesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyQuery = new QueryBuilder_1.default(academicFaculty_model_1.AcademicFaculty.find(), query)
        .search(academicFaculty_constant_1.AcademicFacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield academicFacultyQuery.modelQuery;
    const meta = yield academicFacultyQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleAcademicFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!result) {
        throw new AppError_1.default(404, "Academic faculty not found!");
    }
    return result;
});
const updateAcademicFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(404, "Academic faculty not found!");
    }
    return result;
});
exports.AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
};
