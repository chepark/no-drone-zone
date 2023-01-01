import express from "express";
import router from "./routes/violators.js";

const port = 8000;

const app = express();

app.use("/api/violator", router);

app.listen(port, () => {
  console.log("listening on the port ", port);
});
