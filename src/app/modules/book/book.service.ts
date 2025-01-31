import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TUploadedFile } from "../../interface/file";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { bookSearchableFields } from "./book.const";
import { TBook } from "./book.interface";
import { Book } from "./book.model";

// create a book
const createBookIntoDB = async (file: TUploadedFile, payload: TBook) => {
  if (file) {
    // Send image to Cloudinary
    const imageName = `${payload?.title}${payload?.category}`;
    const path = file?.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);

    payload.thumbnail = secure_url as string;
  }

  const result = await Book.create(payload);

  return result;
};

// Get all books
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(Book.find(), query)
    .search(bookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bookQuery.countTotal();
  const result = await bookQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// Get a specific book
const getSingleBookFromDB = async (id: string): Promise<TBook | null> => {
  const book = await Book.findById(id);

  // Check the book is exists or not
  if (!book) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Book not found");
  }
  return book;
};

// Update a book
const updateBookIntoDB = async (
  id: string,
  updateData: Partial<TBook>,
): Promise<TBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  // Check the book is exists or not
  if (!updatedBook) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Book not found");
  }

  return updatedBook;
};

// Delete a book
const deleteBookFromDB = async (id: string): Promise<TBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id);

  // Check the book is exists or not
  if (!deletedBook) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Book not found");
  }

  return deletedBook;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
