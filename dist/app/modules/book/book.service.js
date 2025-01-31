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
exports.BookServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const book_const_1 = require("./book.const");
const book_model_1 = require("./book.model");
// create a book
const createBookIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        // Send image to Cloudinary
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.title}${payload === null || payload === void 0 ? void 0 : payload.category}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.thumbnail = secure_url;
    }
    const result = yield book_model_1.Book.create(payload);
    return result;
});
// Get all books
const getAllBooksFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bookQuery = new QueryBuilder_1.default(book_model_1.Book.find(), query)
        .search(book_const_1.bookSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield bookQuery.countTotal();
    const result = yield bookQuery.modelQuery;
    return {
        meta,
        result,
    };
});
// Get a specific book
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    // Check the book is exists or not
    if (!book) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "Book not found");
    }
    return book;
});
// Update a book
const updateBookIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    // Check the book is exists or not
    if (!updatedBook) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "Book not found");
    }
    return updatedBook;
});
// Delete a book
const deleteBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.Book.findByIdAndDelete(id);
    // Check the book is exists or not
    if (!deletedBook) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "Book not found");
    }
    return deletedBook;
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};
