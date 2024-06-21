import express from "express";
import { createBook } from "../controllers/book.controller.js";

const bookRouter = new express.Router();

bookRouter.post("/", createBook);

export default bookRouter;
 