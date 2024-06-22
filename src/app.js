import express from "express";
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.router.js";
import cors from "cors";
import { config } from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcom to the project window" });
});

app.use(cors({
  // app.use() - httperrors (global error handler)
  origin: config.frontend_domain,
}))
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

export default app;
