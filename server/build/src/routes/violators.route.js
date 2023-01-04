import express from "express";
import { violatorController } from "../controllers/violatorController.js";
const router = express.Router();
router.get("/realtime", violatorController);
export default router;
//# sourceMappingURL=violators.route.js.map