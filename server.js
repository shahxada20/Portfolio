
import app from "./src/app.js";
import {config} from "./src/config/config.js";

const port = config.port;

app.get('/', (req, res)=> {
    res.json("Hello World")
})

app.listen(port, ()=> {
    console.log(`Welcome to Project,\nServer is listening on port: ${port}`)
});
