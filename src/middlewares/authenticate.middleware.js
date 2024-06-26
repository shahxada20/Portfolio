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
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid Tokenn" });
    }
    req.user = user;
    req.userId = decoded._id; // attch user object to request
    next();
  } catch (error) {
    console.log("Error authenticating user:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticate;
