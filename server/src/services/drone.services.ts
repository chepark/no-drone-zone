import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { REAKTOR_DRONE_API } from "../lib/constants.js";
import { DroneData, DroneReport } from "../lib/types.js";
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
export const fetchDrones = async () => {
  try {
    const response = await axios.get(REAKTOR_DRONE_API);
    return response;
  } catch (error) {
    console.log("Error when fetching drone data.");
  }
};

/**
 * Handles the original data in order to work smoothly in the server side.
 * The function does the three tasks.
 * 1. Fetchs the drone data.
 * 2. Parses XML data fetched from 1 to JSON.
 * 3. Extracts drones and timestamp data and combine as an object.
 *
 * @returns
 */
const handleDroneData = async () => {
  const { data }: { data: string } = await fetchDrones();
  const parsedData: DroneReport = parser.parse(data);

  const drones_timeStamp: { timeStamp: string; drones: DroneData[] } =
    await extractDronesTimeStamp(parsedData);

  return drones_timeStamp;
};

/**
 * The function does the following jobs.
 * 1. Extracts snapshotTimeStamp and drones from the JSON.
 * 2. Returns the two data as an object.
 *
 * @param parsedData - JSON parsed from the XML fetched from Reaktor API.
 * @returns - timeStampe: date string, drones: an Array of objects.
 */
export const extractDronesTimeStamp = async (parsedData: DroneReport) => {
  const {
    report: {
      capture: { "@_snapshotTimestamp": timeStamp, drone: drones },
    },
  } = parsedData;

  return { timeStamp, drones };
};

/**
 * Tracks drones within the NDZ monitoring zone.
 */

export const realtimeDroneTracker = async () => {
  const { timeStamp, drones } = await handleDroneData();

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
};
