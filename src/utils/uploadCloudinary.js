import path from 'path';
import cloudinary from '../config/cloudinary.js';
import { __dirname } from './utils.js';

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