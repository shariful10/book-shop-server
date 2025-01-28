"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_const_1 = require("../user/user.const");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post("/create-academic-faculty", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
router.get("/", academicFaculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
router.get("/:facultyId", academicFaculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch("/:facultyId", (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.updateFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyControllers.updateAcademicFaculty);
exports.AcademicFacultyRoutes = router;
