import { config as conf} from "dotenv";
conf();
 
const _config = {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
};

// Freeze the configuration object to prevent modifications
export const config = Object.freeze(_config)