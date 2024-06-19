import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./db/index.js";

const port = config.port;

app.get("/", (req, res) => {
  res.json("Hello World");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Welcome to Project,\nServer is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });
