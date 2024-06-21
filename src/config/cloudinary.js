import { v2 as cloudinary } from 'cloudinary';
import { config } from "./config.js";


cloudinary.config({ 
        cloud_name: config.cloudinaryCloud, 
        api_key: config.cloudinaryAPIKey, 
        api_secret: config.cloudinarySecretKey,
});

export default cloudinary;