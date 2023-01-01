import express from "express";
const router = express.Router();

// sent data to init the app
router.get("/");

// server side event
router.get("realtime-violators");

export default router;
