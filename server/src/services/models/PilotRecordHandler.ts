import { PilotData, pilotDistanceRecord } from "../../lib/types.js";

class PilotRecordHandler {
  pilotId: string;
  name: string;
  phoneNumber: string;
  email: string;
  distance: number;
  closestDistance: number;
  updateRecord: Boolean;
  lastSeenAt: string;

  constructor(
    pilotData: PilotData,
    distance: number,
    time: string,
    record: number
  ) {
    const { pilotId, firstName, lastName, phoneNumber, email } = pilotData;

    this.pilotId = pilotId;
    this.name = `${firstName} ${lastName}`;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.distance = distance;
    this.closestDistance = this.#checkDistanceRecord(record);
    this.lastSeenAt = time;
  }

  // record is coming from db
  #checkDistanceRecord(record: pilotDistanceRecord = false): number {
    // record x
    if (!record) {
      this.updateRecord = true;
      return this.distance;
    }

    // record o
    if (record) {
      if (this.distance < record) {
        this.updateRecord = true;
        return this.distance;
      } else {
        this.updateRecord = false;
        return record;
      }
    }
  }
}

export default PilotRecordHandler;
