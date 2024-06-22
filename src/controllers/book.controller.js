import { Book } from "../models/book.model.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";
import { deleteFile } from "../utils/fileDeleteUtils.js";

// Controller function to create a book
export const createBook = async (req, res) => {
  try {
    // get title, genre and files from request body
    const { title, genre } = req.body;
    const { files } = req;

    // Check if cover and file are provided in the request
    if (!files?.cover?.[0] || !files?.file?.[0]) {
      return res.status(400).json({ message: "Files are missing" });
    }

    const [coverFile, pdfFile] = [req.files.cover[0], req.files.file[0]];

    // Upload the files to Cloudinary concurrently
    const coverUploadResult = await uploadToCloudinary(coverFile, "book-covers");
    const pdfUploadResult = await uploadToCloudinary(pdfFile, "book-files");

    // Create a new book entry in the database
    const newBook = await Book.create({
      title: title,
      genre: genre,
      author: "6674138f80d73e82f8978387",
      cover: coverUploadResult.secure_url,
      file: pdfUploadResult.secure_url,
    });

    // Delete the local files after uploading to Cloudinary
    await Promise.all([deleteFile(coverFile.path), deleteFile(pdfFile.path)]);

    res.status(201).json({ message: "File uploaded successfully", id: newBook._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error", error });
  }
};