"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
        required: true,
    },
    thumbnail: { type: String },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
