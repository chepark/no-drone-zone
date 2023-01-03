import express from "express";
import { violatorController } from "../controllers/violatorController.js";
// import { AppDataSource } from "../typeorm/data-source.js";
// import { Violator } from "../typeorm/entity/Violator.js";

const router = express.Router();
// const violatorRepository = AppDataSource.getRepository(Violator);

// sent data to init the app
router.get("/init", async () => {
  // const t = await violatorRepository.findOneBy({ pilotId: "P-2wfvB-1ob6" });
});

// server side event
router.get("/realtime", violatorController);

export default router;
