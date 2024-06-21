import { Book } from "../models/book.model.js";
import cloudinary from "../config/cloudinary.js";
import path from "node:path";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

export const createBook = async (req, res) => {
  try {
    // console.log("files", req.files);
    const coverFile = req.files.cover[0];
    const pdfFile = req.files.file[0];

    const coverUploadResult = await uploadToCloudinary(coverFile, "book-covers");
    const pdfUploadResult = await uploadToCloudinary(pdfFile, "book-files");

    res.status(200).json({ message: "File uploaded successfully", coverUploadResult, pdfUploadResult, });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error", error });
  }
};
