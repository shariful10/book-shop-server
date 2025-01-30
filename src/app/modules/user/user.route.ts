import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLE } from "./user.const";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllUsers,
);

router.get(
  "/:userId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getSingleUser,
);

router.get(
  "/me",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getMe,
);

router.delete(
  "/:userId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
