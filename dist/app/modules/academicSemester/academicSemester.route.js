"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validation_1 = require("./academicSemester.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../user/user.const");
const router = express_1.default.Router();
router.post("/create-academic-semester", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.createAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.createAcademicSemester);
router.get("/", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemesters);
router.get("/:semesterId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), academicSemester_controller_1.AcademicSemesterControllers.getSingleAcademicSemester);
router.patch("/:semesterId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.updateAcademicSemesterValidationSchema), academicSemester_controller_1.AcademicSemesterControllers.updateAcademicSemester);
exports.AcademicSemesterRoutes = router;
