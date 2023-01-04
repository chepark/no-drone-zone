var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { REAKTOR_PILOT_API } from "../lib/constants.js";
import PilotRecordHandler from "./models/PilotRecordHandler.js";
import { PilotStorage } from "./PilotStorage.services.js";
export const fetchPilotFromReaktor = (serialNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(REAKTOR_PILOT_API + serialNumber);
        return response;
    }
    catch (error) {
        console.log("Error in Pilot Reaktor API: ", error);
    }
});
export const handlePilot = (serialNumber, distance, coordinates, time) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield fetchPilotFromReaktor(serialNumber);
    const { pilotId } = data;
    // check the pilot information in DB.
    const record = yield PilotStorage.findPilotById(pilotId);
    if (!record) {
        yield PilotStorage.createPilot(data, distance, coordinates, time);
    }
    if (record) {
        const pilotRecordHandler = new PilotRecordHandler(data, distance, time, record.distance);
        if (pilotRecordHandler.updateRecord) {
            PilotStorage.updateDistanceLastSeenTime(pilotId, pilotRecordHandler.closestDistance, coordinates, time);
        }
        else {
            PilotStorage.updateLastSeenTime(pilotId, time);
        }
    }
});
//# sourceMappingURL=pilot.services.js.map