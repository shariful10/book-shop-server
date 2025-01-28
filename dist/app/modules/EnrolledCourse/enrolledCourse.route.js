"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_const_1 = require("../user/user.const");
const enrolledCourse_controller_1 = require("./enrolledCourse.controller");
const enrolledCourse_validation_1 = require("./enrolledCourse.validation");
const router = express_1.default.Router();
router.post("/create-enrolled-course", (0, auth_1.default)(user_const_1.USER_ROLE.student), (0, validateRequest_1.default)(enrolledCourse_validation_1.EnrolledCourseValidations.createEnrolledCourseValidationZodSchema), enrolledCourse_controller_1.EnrolledCourseControllers.createEnrolledCourse);
router.get("/my-enrolled-courses", (0, auth_1.default)(user_const_1.USER_ROLE.student), enrolledCourse_controller_1.EnrolledCourseControllers.getMyEnrolledCourses);
router.patch("/update-enrolled-course-marks", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty), (0, validateRequest_1.default)(enrolledCourse_validation_1.EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema), enrolledCourse_controller_1.EnrolledCourseControllers.updateEnrolledCourse);
exports.EnrolledCourseRoutes = router;
