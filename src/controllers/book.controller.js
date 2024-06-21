import { Book } from "../models/book.model.js";

export const createBook = async (req, res) => {
  try {
    console.log("files", req.files);
    res.status(200).json({message: "Hello There!"})
  } catch (error) {
    res.status(500).json("Error", error)
  }
};