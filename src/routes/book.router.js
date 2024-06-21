import express from "express";
import { createBook } from "../controllers/book.controller.js";
import upload from "../middlewares/upload.middleware.js";

const bookRouter = new express.Router();

bookRouter.post("/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]), createBook
);

export default bookRouter;