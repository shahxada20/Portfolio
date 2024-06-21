import multer from "multer";
import path from "node:path";
import { __dirname } from "../utils/utils.js"; 

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 },
  });

  export default upload;