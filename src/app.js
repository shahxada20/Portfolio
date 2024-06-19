import express from "express";

const app = express();

app.get("/", (req, res)=> {
    res.json({message:"Welcom to the project window"})
})

// app.use() - httperrors (global error handler)

export default app;