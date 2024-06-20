import express from "express";
import { registerUser } from "../controllers/userRegister.controller.js";
import { loginUser } from "../controllers/userRegister.controller.js";

const userRouter = new express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
