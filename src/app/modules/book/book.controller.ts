import { TUploadedFile } from "../../interface/file";
import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBookIntoDB(
    req.file as TUploadedFile,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    message: "Book created successfully!",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooksFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    message: "Books are retrieved successfully!",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};
