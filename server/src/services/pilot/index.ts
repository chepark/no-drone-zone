import { Pilot } from "../../lib/types.js";

export function handlePilotData(pilotData: Pilot, distance: number) {
  const { pilotId, firstName, lastName, phoneNumber, email } = pilotData;

  const pilot = {
    pilotId,
    name: `${firstName} ${lastName}`,
    phoneNumber,
    email,
    distance,
  };

  return pilot;
}

export function postPilotData() {}
