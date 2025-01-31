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
const user_const_1 = require("./user.const");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-user", sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
router.get("/", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), user_controller_1.UserControllers.getAllUsers);
router.get("/:userId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), user_controller_1.UserControllers.getSingleUser);
router.get("/me/:email", user_controller_1.UserControllers.getMe);
router.delete("/:userId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), user_controller_1.UserControllers.deleteUser);
router.patch("/:userId", sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.UserValidations.updateUserValidationSchema), user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
