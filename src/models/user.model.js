import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Token generation
userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
