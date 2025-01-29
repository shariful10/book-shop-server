"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-user", sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), user_controller_1.UserControllers.createUser);
router.get("/", user_controller_1.UserControllers.getAllUsers);
exports.UserRoutes = router;
