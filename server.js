import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/db/index.js";

const port = config.port;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });
