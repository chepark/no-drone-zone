import express from "express";
import Drone from "../services/drone/index.js";
import { handlePilotData, postPilotData } from "../services/pilot/index.js";

const router = express.Router();

// sent data to init the app
router.get("/init", () => {
  console.log("INIT");
});

// server side event
router.get("/realtime", () => {
  console.log("REALTIME");
});

export default router;
