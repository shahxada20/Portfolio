import express from "express";
import userRouter from "./routes/user.routes.js";
const app = express();

app.get("/", (req, res)=> {
    res.json({message:"Welcom to the project window"})
})

// app.use() - httperrors (global error handler)
app.use("/api/users", userRouter)

export default app;