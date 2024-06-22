import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";

const authenticate = async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  const parsedToken = token.split(" ")[1];
  
  try {
    const decoded = jwt.verify(parsedToken, config.jwtSecret);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attch user object to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authenticate;
