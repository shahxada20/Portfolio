import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const userRegister = async (req, res) => {
  try {
    // validation
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({message: "All fields are required"});
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if already registered
      return res
        .status(409)
        .json({ message: "User already registered with this email" });
    } else {
      // Hash the password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      // Generate the access token
      const token = newUser.generateAccessToken();
      // response
      res.status(201).json({ message: `User Registered: ${token}` });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "something went wrong" });
  }
};
