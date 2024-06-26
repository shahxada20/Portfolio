import express from "express";
import {
  createBook,
  deleteBook,
  getSingleBook,
  listBooks,
  updateBook,
} from "../controllers/book.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";

const bookRouter = new express.Router();

bookRouter.post(
  "/",
  authenticateUser,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.patch(
  "/:bookId",
  authenticateUser,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/", listBooks);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.delete("/:bookId", deleteBook);

export default bookRouter;
