import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { realtimeDroneTracker } from "./src/services/drone.services.js";
import { PilotStorage } from "./src/services/PilotStorage.services.js";
import { AppDataSource } from "./src/config/data-source.js";

import { dataStreamer } from "./src/controllers/dataStreamerController.js";

const port = 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", dataStreamer);

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
