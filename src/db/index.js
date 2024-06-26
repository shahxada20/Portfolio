import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { config } from "../../src/config/config.js";

const connectDB = async() => {
    try {
        const ConnectionInstance = await mongoose.connect(`${config.mongodbUri}/${DB_NAME}`)
        console.log(`MONGODB CONNECTED!! DB HOST: ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION FAILED ", error)
        process.exit(1)
    }
};

export default connectDB; 