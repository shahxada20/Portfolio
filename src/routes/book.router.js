import express from "express";
import { createBook} from "../controllers/book.controller.js";
import { upload }  from "../middlewares/upload.middleware.js";
import authenticateUser from "../middlewares/authenticate.middleware.js";

const bookRouter = new express.Router();

bookRouter.post("/",
  authenticateUser,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]), createBook
);
// bookRouter.patch("/", updateBook);

export default bookRouter;