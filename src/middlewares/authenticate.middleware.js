import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No Authorization token is Provided" });
  }
  // console.log(token);
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded._id);
    // console.log(decoded);
    if (!user) {
      return res.status(401).json({ message: "Invalid Tokenn" });
    }
    req.user = user; // attch user object to request
    next();
  } catch (error) {
    console.log("Error authenticating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticate;