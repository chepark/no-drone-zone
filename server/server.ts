import express from "express";
import cors from "cors";
import path from "path";
import { realtimeDroneTracker } from "./src/services/drone.services.js";
import { PilotStorage } from "./src/services/pilotStorage.services.js";
import { AppDataSource } from "./src/config/data-source.js";

import { dataStreamer } from "./src/controllers/dataStreamerController.js";

const port = 8000;

const app = express();

app.use(cors());

app.get("/", dataStreamer);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client", "/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client", "/build", "index.html"));
});

app.listen(port, () => {
  console.log("listening on the port ", port);
});

AppDataSource.initialize()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db connection error", err);
  });

setInterval(() => {
  PilotStorage.deleteOldData();
  realtimeDroneTracker();
}, 2000);
