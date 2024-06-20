import express from "express";
import { userRegister } from "../controllers/userRegister.controller.js";
import { userLogin } from "../controllers/userLogin.controller.js";

const userRouter = new express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

export default userRouter;
