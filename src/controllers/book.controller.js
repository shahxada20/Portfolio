import { Book } from "../models/book.model.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";
import { deleteFile } from "../utils/fileDeleteUtils.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

export const createBook = async (req, res) => {
  /* Controller function to create a book
    get title, genre and files from request body
    Check if cover and file are provided in the request
    Upload the files to Cloudinary concurrently
    Create a new book entry in the database
    Delete the local files after uploading to Cloudinary
  */
  try {
    const { title, genre } = req.body;
    const { files } = req;
    const userId = req.user._id;

    if (!files?.cover?.[0] || !files?.file?.[0]) {
      return res.status(400).json({ message: "Files are missing" });
    }
    const [coverFile, pdfFile] = [req.files.cover[0], req.files.file[0]];

    const coverUpload = await uploadToCloudinary(coverFile, "book-covers");
    const pdfUploadResult = await uploadToCloudinary(pdfFile, "book-files");

    const newBook = await Book.create({
      title: title,
      genre: genre,
      author: userId,
      cover: coverUpload.secure_url,
      file: pdfUploadResult.secure_url,
    });

    await Promise.all([deleteFile(coverFile.path), deleteFile(pdfFile.path)]);

    res
      .status(201)
      .json({ message: "File uploaded successfully", id: newBook._id, userId });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error", error });
  }
};

// controller function to update book by ID
export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    const { title, genre } = req.body;
    const { files } = req;

    const book = await Book.findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    // check authorization
    if (book.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (genre) updateData.genre = genre;

    if (files?.cover?.[0]) {
      const coverFile = files.cover[0];
      const coverUpload = await uploadToCloudinary(coverFile, "book-covers");
      updateData.cover = coverUpload.secure_url;
      await deleteFile(coverFile.path);
    }

    if (files?.file?.[0]) {
      const pdfFile = files.file[0];
      const pdfUploadResult = await uploadToCloudinary(pdfFile, "book-files");
      updateData.file = pdfUploadResult.secure_url;
      await deleteFile(pdfFile.path);
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      updateData,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", id: updatedBook._id });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller function to get all book
export const listBooks = async (req, res) => {
  try {
    // add pagination later
    const books = await Book.find().populate("author", "name");
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller function to get a book by ID
export const getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    const book = await Book.findOne({ _id: bookId }).populate("author", "name");
    if (!book) {
      return res.status(404).json({ message: "Book NOT Found" });
    }
    return res.status(200).json({ message: "Book Found", book });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller function to delete book by ID
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    const book = await Book.findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    // check authorization
    if (book.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const coverSplit = book.cover.split("/");
    const coverPublicId =
      coverSplit.at(-2) + "/" + coverSplit.at(-1)?.split(".").at(-2);
    const fileSplit = book.file.split("/");
    const filePublicId = fileSplit.at(-2) + "/" + fileSplit.at(-1);

    try {
      await cloudinary.uploader.destroy(coverPublicId);
      await cloudinary.uploader.destroy(filePublicId, { resource_type: "raw" });
    } catch (error) {
      return res.status(400).json({ message: "Operation Failed" });
    }

    await Book.findByIdAndDelete(bookId);
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
