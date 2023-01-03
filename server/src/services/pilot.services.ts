import axios from "axios";
import { REAKTOR_PILOT_API } from "../lib/constants.js";
import { PilotData } from "../lib/types.js";
import PilotRecordHandler from "./models/PilotRecordHandler.js";
import { PilotStorage } from "./PilotStorage.services.js";

export const fetchPilotFromReaktor = async (serialNumber: string) => {
  try {
    const response = await axios.get(REAKTOR_PILOT_API + serialNumber);
    return response;
  } catch (error) {
    console.log("Error in Pilot Reaktor API: ", error);
  }
};

export const handlePilot = async (
  serialNumber: string,
  distance: number,
  time: string
) => {
  const { data }: { data: PilotData } = await fetchPilotFromReaktor(
    serialNumber
  );

  const { pilotId } = data;

  // check the pilot information in DB.
  const record = await PilotStorage.findPilotById(pilotId);

  if (!record) {
    await PilotStorage.createPilot(data, distance, time);
  }

  if (record) {
    console.log("EXISTING PILOT");
    const pilotRecordHandler = new PilotRecordHandler(
      data,
      distance,
      time,
      record.distance
    );

    if (pilotRecordHandler.updateRecord) {
      PilotStorage.updateDistanceLastSeenTime(
        pilotId,
        pilotRecordHandler.closestDistance,
        time
      );
    } else {
      PilotStorage.updateLastSeenTime(pilotId, time);
    }
  }
};
