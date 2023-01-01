import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const port = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("helloddddd express");
});

app.get("/hi", (req, res) => {
  res.send("hiiii");
});

app.listen(port, () => {
  console.log("listening on the port ", port);
});
