import axios, { AxiosResponse } from "axios";
import { XMLParser } from "fast-xml-parser";
import { REAKTOR_DRONE_API } from "../lib/constants.js";
import { DroneReport } from "../lib/types.js";
import Drone from "./models/Drone.js";
import { handlePilot } from "./pilot.services.js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export const fetchDrones = async () => {
  try {
    const response = await axios.get(REAKTOR_DRONE_API);
    if (!response.data) {
      console.log("response data", response);
    }
    return response;
  } catch (error) {
    console.log("Error when fetching drone data.");
  }
};

export const handleDroneData = async () => {
  // parse XML string to JSON
  const { data }: { data: string } = await fetchDrones();
  const parsedData: DroneReport = parser.parse(data);

  const drones_timeStamp = await extractDronesTimeStamp(parsedData);
  return drones_timeStamp;
};

export const extractDronesTimeStamp = async (parsedData: DroneReport) => {
  const {
    report: {
      capture: { "@_snapshotTimestamp": timeStamp, drone: drones },
    },
  } = parsedData;

  return { timeStamp, drones };
};

export const realtimeDroneTracker = async () => {
  const { timeStamp, drones } = await handleDroneData();

  drones.map((d) => {
    let { serialNumber, positionX, positionY } = d;

    positionX = positionX / 1000;
    positionY = positionY / 1000;

    const drone = new Drone(serialNumber, positionX, positionY);
    const coordinates = { positionX, positionY };

    if (drone.violatedNDZ) {
      console.log("VIOLATOR!", serialNumber, drone.distance);
      handlePilot(serialNumber, drone.distance, coordinates, timeStamp);
    } else {
      console.log("GOOD!", serialNumber, drone.distance);
    }
  });
};
