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
import { XMLParser } from "fast-xml-parser";
import { REAKTOR_DRONE_API } from "../lib/constants.js";
import Drone from "./models/Drone.js";
import { handlePilot } from "./pilot.services.js";
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
});
export const fetchDrones = () => __awaiter(void 0, void 0, void 0, function* () {
    //! handle undefined data from api
    try {
        const response = yield axios.get(REAKTOR_DRONE_API);
        //! remove if undefined data issue is solved
        if (!response.data) {
            console.log("response data", response);
        }
        return response;
    }
    catch (error) {
        console.log("Error when fetching drone data.");
    }
});
export const handleDroneData = () => __awaiter(void 0, void 0, void 0, function* () {
    // parse XML string to JSON
    const { data } = yield fetchDrones();
    const parsedData = parser.parse(data);
    const drones_timeStamp = yield extractDronesTimeStamp(parsedData);
    return drones_timeStamp;
});
export const extractDronesTimeStamp = (parsedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { report: { capture: { "@_snapshotTimestamp": timeStamp, drone: drones }, }, } = parsedData;
    return { timeStamp, drones };
});
export const realtimeDroneTracker = () => __awaiter(void 0, void 0, void 0, function* () {
    const { timeStamp, drones } = yield handleDroneData();
    drones.map((d) => {
        const { serialNumber, positionX, positionY } = d;
        const drone = new Drone(serialNumber, positionX, positionY);
        if (drone.violatedNDZ) {
            console.log("VIOLATOR!", serialNumber, drone.distance);
            handlePilot(serialNumber, drone.distance, timeStamp);
        }
        else {
            console.log("GOOD!", serialNumber, drone.distance);
        }
    });
});
//# sourceMappingURL=drone.services.js.map