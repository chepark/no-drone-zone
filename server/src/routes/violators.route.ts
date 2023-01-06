import express from "express";
import { violatorController } from "../controllers/violatorController.js";

const router = express.Router();

/**
 * Define the URL path in the first argument.
 * The second is a callback that is invoked if an HTTP GET request with the path is received.
 */

router.get("/realtime", violatorController);

export default router;
