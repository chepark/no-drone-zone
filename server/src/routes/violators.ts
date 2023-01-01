import express from "express";
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
