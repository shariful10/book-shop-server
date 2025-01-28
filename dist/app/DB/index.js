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
const config_1 = __importDefault(require("../config"));
const user_const_1 = require("../modules/user/user.const");
const user_model_1 = require("../modules/user/user.model");
const superUser = {
    id: "0001",
    email: "khanana900@gmail.com",
    password: config_1.default.superAdminPassword,
    needsChangePassword: false,
    role: user_const_1.USER_ROLE.superAdmin,
    status: "in-progress",
    isDeleted: false,
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    // When database is connected, we will check is there  any user who is super admin
    const isSuperAdminExists = yield user_model_1.User.findOne({ role: user_const_1.USER_ROLE.superAdmin });
    if (!isSuperAdminExists) {
        yield user_model_1.User.create(superUser);
    }
});
exports.default = seedSuperAdmin;
