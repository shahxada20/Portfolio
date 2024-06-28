import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
