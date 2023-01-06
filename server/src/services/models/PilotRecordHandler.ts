import { PilotData, pilotDistanceRecord } from "../../lib/types.js";

/**
 * Handles the pilot data fetched from {@link https://assignments.reaktor.com/birdnest/pilots/:serialNumber}
 *
 * The module achieves the two main purpose.
 * 1. Check which one is closer to the bird's nest: the distance data in DB or the current distance data fetched from Reaktor API?
 * 2. If the current distance is closer, set True for
 *
 * @module PilotRecordHandler
 */

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

  /**
   * Check which one is closer to the bird's nest: the current drone or the one saved in DB?
   *
   * @private
   * @param record - The pilot's closest distance record saved in DB
   * @returns - The current distance or the distance saved in DB
   */
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
