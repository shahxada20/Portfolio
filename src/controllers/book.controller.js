import { Book } from "../models/book.model.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";
import { deleteFile } from "../utils/fileDeleteUtils.js";

/* Controller function to create a book
  get title, genre and files from request body
  Check if cover and file are provided in the request
  Upload the files to Cloudinary concurrently
  Create a new book entry in the database
  Delete the local files after uploading to Cloudinary
*/
export const createBook = async (req, res) => {
  try {
    const { title, genre } = req.body;
    const { files } = req;
    const userId = req.user._id;

    if (!files?.cover?.[0] || !files?.file?.[0]) {
      return res.status(400).json({ message: "Files are missing" });
    }
    const [coverFile, pdfFile] = [req.files.cover[0], req.files.file[0]];
    
    const coverUploadResult = await uploadToCloudinary(coverFile, "book-covers");
    const pdfUploadResult = await uploadToCloudinary(pdfFile, "book-files");

    const newBook = await Book.create({
      title: title,
      genre: genre,
      author: userId,
      cover: coverUploadResult.secure_url,
      file: pdfUploadResult.secure_url,
    });

    await Promise.all([deleteFile(coverFile.path), deleteFile(pdfFile.path)]);

    res.status(201).json({ message: "File uploaded successfully", id: newBook._id });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error", error });
  }
};


// controller function to read all book
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    resizeBy.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// controller function to read book by Id
export const updateBook = async (req, res) => {
  try {

    const bookExists = await Book.findByIdAndUpdate(req.params.id);
    if (!bookExists) {
      res.status(404).json({ message: "Book not found" });
      // if (bookExists.author.toString() !== req.userId){
      //   return res.status(403).json({message: "Unathorized"})}
      // update coverImage and file
    } else {
      res.status(200).send(bookExists);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// controller function to read book by Id
export const deleteBook = async (req, res) => {
  try {
    const bookExists = await Book.findByIdAndDelete(req.params.id);
    if (!bookExists) {
      res
        .status(404)
        .json({ message: "Book is not registered or already deleted" });
    } else {
      res.status(200).json({ message: "Book deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
