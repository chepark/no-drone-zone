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
/**
 * Fetches drone data from {@link https://assignments.reaktor.com/birdnest/drones}
 * @returns - Response from the API.
 */
export const fetchDrones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(REAKTOR_DRONE_API);
        return response;
    }
    catch (error) {
        console.log("Error when fetching drone data.");
    }
});
/**
 * Handles the original data in order to work smoothly in the server side.
 * The function does the three tasks.
 * 1. Fetchs the drone data.
 * 2. Parses XML data fetched from 1 to JSON.
 * 3. Extracts drones and timestamp data and combine as an object.
 *
 * @returns
 */
const handleDroneData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield fetchDrones();
    const parsedData = parser.parse(data);
    const drones_timeStamp = yield extractDronesTimeStamp(parsedData);
    return drones_timeStamp;
});
/**
 * The function does the following jobs.
 * 1. Extracts snapshotTimeStamp and drones from the JSON.
 * 2. Returns the two data as an object.
 *
 * @param parsedData - JSON parsed from the XML fetched from Reaktor API.
 * @returns - timeStampe: date string, drones: an Array of objects.
 */
export const extractDronesTimeStamp = (parsedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { report: { capture: { "@_snapshotTimestamp": timeStamp, drone: drones }, }, } = parsedData;
    return { timeStamp, drones };
});
/**
 * Tracks drones within the NDZ monitoring zone.
 */
export const realtimeDroneTracker = () => __awaiter(void 0, void 0, void 0, function* () {
    const { timeStamp, drones } = yield handleDroneData();
    /**
     * Maps through the information of all drones in the monitoring zone.
     */
    drones.map((d) => {
        let { serialNumber, positionX, positionY } = d;
        /**
         * Devided by 1000 to match the coordinate values into the values of the meter unit.
         * */
        positionX = positionX / 1000;
        positionY = positionY / 1000;
        const drone = new Drone(serialNumber, positionX, positionY);
        const coordinates = { positionX, positionY };
        /**
         * If a drone violates NDZ, pilot data is fetched and handled to save or update in DB.
         */
        if (drone.violatedNDZ) {
            console.log("VIOLATOR!", serialNumber, drone.distance);
            handlePilot(serialNumber, drone.distance, coordinates, timeStamp);
        }
    });
});
//# sourceMappingURL=drone.services.js.map