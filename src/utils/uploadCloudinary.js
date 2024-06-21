// import cloudinary from "../config/cloudinary";
// import { v2 } from "cloudinary";
// import fs from "node:fs";

import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadToCloudinary = async (file, folder) => {
  try {
    const filePath = path.resolve(__dirname, '../../public/uploads', file.filename);
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: file.filename,
      folder,
    });
    return uploadResult;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
