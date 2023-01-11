import axios from "axios";
import { REAKTOR_PILOT_API } from "../lib/constants.js";
import { PilotData } from "../lib/types.js";
import PilotRecordHandler from "./models/PilotRecordHandler.js";
import { PilotStorage } from "./PilotStorage.services.js";

/**
 * Fetches a pilot data from Reaktor API
 * @param serialNumber - Drone's serial number.
 * @returns Response from the Reaktor API.
 */

export const fetchPilotFromReaktor = async (serialNumber: string) => {
  try {
    const response = await axios.get(REAKTOR_PILOT_API + serialNumber);
    return response;
  } catch (error) {
    console.log("Error in Pilot Reaktor API: ", error);
  }
};

/**
 * The function is called when a drone breaks into the NDZ.
 * It fetches the data of the drone pilot, then create or update pilot data in DB.
 *
 * @param serialNumber - It is used to fetch pilot data from Reaktor API.
 * @param distance - The distance between the drone currently breaks in NDZ and the bird's nest.
 * @param coordinates - The drone's XY coordinates in the monitoring zone.
 * @param time - Timestamp that drone was detected.
 */
export const handlePilot = async (
  serialNumber: string,
  distance: number,
  coordinates: { positionX: number; positionY: number },
  time: string
) => {
  const { data }: { data: PilotData } = await fetchPilotFromReaktor(
    serialNumber
  );

  const { pilotId } = data;

  const record = await PilotStorage.findPilotById(pilotId);

  if (!record) {
    await PilotStorage.createPilot(data, distance, coordinates, time);
  }

  if (record) {
    const pilotRecordHandler = new PilotRecordHandler(
      data,
      distance,
      time,
      record.distance
    );

    // if (pilotRecordHandler.updateRecord) {
    //   PilotStorage.updateDistanceLastSeenTime(
    //     pilotId,
    //     pilotRecordHandler.closestDistance,
    //     coordinates,
    //     time
    //   );
    // } else {
    //   PilotStorage.updateLastSeenTime(pilotId, time);
    // }

    pilotRecordHandler.updateRecord
      ? PilotStorage.updateDistanceLastSeenTime(
          pilotId,
          pilotRecordHandler.closestDistance,
          coordinates,
          time
        )
      : PilotStorage.updateLastSeenTime(pilotId, time);
  }
};
