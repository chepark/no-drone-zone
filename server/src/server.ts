import express from "express";
import violatorsRouter from "./routes/violators.route.js";
import { realtimeDroneTracker } from "./services/drone.services.js";
import { PilotStorage } from "./services/PilotStorage.services.js";
import { AppDataSource } from "./typeorm/data-source.js";

const port = 8000;

const app = express();

app.use("/api/violators", violatorsRouter);

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
