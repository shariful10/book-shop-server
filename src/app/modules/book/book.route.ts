import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import { BookController } from "./book.controller";
import { BookValidations } from "./book.validation";

const router = express.Router();

router.post(
  "/create-book",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BookValidations.createBookValidationSchema),
  BookController.createBook,
);

export const BookRoutes = router;
