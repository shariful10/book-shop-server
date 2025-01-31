import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
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
  },
  {
    timestamps: true,
  },
);

export const Book = model<TBook>("Book", bookSchema);
