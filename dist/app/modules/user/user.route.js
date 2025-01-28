"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const admin_validation_1 = require("../Admin/admin.validation");
const faculty_validation_1 = require("../Faculty/faculty.validation");
const student_validation_1 = require("../student/student.validation");
const user_const_1 = require("./user.const");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-student", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(student_validation_1.StudentValidations.createStudentValidationSchema), user_controller_1.UserControllers.createStudent);
router.post("/create-faculty", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(faculty_validation_1.facultyValidations.createFacultyValidationSchema), user_controller_1.UserControllers.createFaculty);
router.post("/create-admin", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.post("/change-status/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_validation_1.UserValidations.changeStatusValidationSchema), user_controller_1.UserControllers.changeStatus);
router.get("/me", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), user_controller_1.UserControllers.getMe);
exports.UserRoutes = router;
