import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const userLogin = async (req, res) => {
    try {
        // validation
        const { email, password } = req.body;
        if ([email, password].some((field) => field?.trim() === "")) {
          return res.status(400).json({message: "All Fields are Required"});
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({message: "User Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: "Username or Password is Incorrect"})
        }else{
            // Generate the access token
          const token = user.generateAccessToken();
          const userId = user._id;
          // response
          res.status(200).json({ message: `User Logged in Token: ${token}`, userId });
        }
    }catch(error){
        res.status(500).json({ message: `Something Went Wrong` });
    }
}