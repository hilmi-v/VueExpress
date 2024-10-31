import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();

//use cors
app.use(cors());

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log("express started on http://localhost:" + port);
});

