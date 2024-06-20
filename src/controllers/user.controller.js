// import {User} from "../models/user.model.js";

// const registeruser = async ((req, res)=> {
//     const { name, email, password } = req.body
//     console.log("body ", req.body)
// }) 

export const registerUser = async (req, res) => {
    res.json({message: "User Registered"})
}

export const loginUser = async (req, res) => {
    res.json({message: "User Logged in"})
}