import express from "express";
import { createBook, updateBook, getAllBooks, deleteBook } from "../controllers/book.controller.js";
import { upload }  from "../middlewares/upload.middleware.js";
// import authenticate from "../middlewares/authenticate.middleware.js";

const bookRouter = new express.Router();

bookRouter.post("/",
  // authenticate,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]), createBook
);
bookRouter.patch("/", updateBook)

export default bookRouter;