"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_const_1 = require("../user/user.const");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const router = express_1.default.Router();
router.post("/create-semester-registration", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidations.createSemesterRegistrationValidationSchema), semesterRegistration_controller_1.SemesterRegistrationController.createSemesterRegistration);
router.get("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), semesterRegistration_controller_1.SemesterRegistrationController.getSingleSemesterRegistration);
router.patch("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema), semesterRegistration_controller_1.SemesterRegistrationController.updateSemesterRegistration);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), semesterRegistration_controller_1.SemesterRegistrationController.deleteSemesterRegistration);
router.get("/", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.faculty, user_const_1.USER_ROLE.student), (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), semesterRegistration_controller_1.SemesterRegistrationController.getAllSemesterRegistrations);
exports.semesterRegistrationRoutes = router;
