var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { violatorController } from "../controllers/violatorController.js";
// import { AppDataSource } from "../typeorm/data-source.js";
// import { Violator } from "../typeorm/entity/Violator.js";
const router = express.Router();
// const violatorRepository = AppDataSource.getRepository(Violator);
// sent data to init the app
router.get("/init", () => __awaiter(void 0, void 0, void 0, function* () {
    // const t = await violatorRepository.findOneBy({ pilotId: "P-2wfvB-1ob6" });
}));
// server side event
router.get("/realtime", violatorController);
export default router;
//# sourceMappingURL=violators.route.js.map