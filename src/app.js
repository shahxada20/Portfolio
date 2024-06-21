import express from "express";
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.router.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcom to the project window" });
});

app.use(express.json());
// app.use() - httperrors (global error handler)
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

export default app;
