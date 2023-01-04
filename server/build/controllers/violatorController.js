var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PilotStorage } from "../services/PilotStorage.services.js";
export const violatorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const violators = await PilotStorage.getAllPilots();
    // testing
    //curl -H Accept:text/event-stream http://localhost:8000/api/violators/realtime
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const violators = yield PilotStorage.getAllPilots();
        const data = `data:${JSON.stringify(violators)}\n\n`;
        res.write(data);
    }), 2000);
});
//# sourceMappingURL=violatorController.js.map