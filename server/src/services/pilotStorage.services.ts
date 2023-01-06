import { PilotData } from "../lib/types.js";
import { AppDataSource } from "../config/data-source.js";
import { Pilot } from "../db/entity/Pilot.js";
import { dateIsoStringToMySqlDateTime } from "../lib/dateFormatter.js";
import { OLD_DATA_TIME_GAP } from "../lib/constants.js";

const pilotRepository = AppDataSource.getRepository(Pilot);

/**
 * The module contains all methods to do CRUD operations in the pilot table in DB.
 * @module PilotStorage
 */
export class PilotStorage {
  /**
   * Find the pilot data matching with the pilotId.
   * @param pilotId
   * @returns
   */
  static async findPilotById(pilotId: string) {
    const pilot = await pilotRepository.findOneBy({ pilotId });
    return pilot;
  }

  /**
   * Create a new row.
   * @param data - pilot inforamtion
   * @param distance - current distance between the drone and the bird's nest.
   * @param coordinates - XY position within the monitoring zone.
   * @param timeStamp - The timestamp when the drone was detected.
   */
  static async createPilot(
    data: PilotData,
    distance: number,
    coordinates: { positionX: number; positionY: number },
    timeStamp: string
  ) {
    const { pilotId, firstName, lastName, phoneNumber, email } = data;

    const pilot = new Pilot();
    pilot.pilotId = pilotId;
    pilot.name = `${firstName} ${lastName}`;
    pilot.phoneNumber = phoneNumber;
    pilot.email = email;
    pilot.distance = distance;
    pilot.positionX = coordinates.positionX;
    pilot.positionY = coordinates.positionY;
    pilot.lastSeenAt = dateIsoStringToMySqlDateTime(timeStamp);

    await pilotRepository.save(pilot);
  }

  /**
   * Update the cloesest distance and last seen timestamp.
   * @param pilotId
   * @param distance - current distance between the drone and the bird's nest.
   * @param coordinate - XY position within the monitoring zone.
   * @param time - The timestamp when the drone was detected.
   */
  static async updateDistanceLastSeenTime(
    pilotId: string,
    distance: number,
    coordinate: { positionX: number; positionY: number },
    time: string
  ) {
    const pilotToUpdate = await PilotStorage.findPilotById(pilotId);
    pilotToUpdate.distance = distance;
    pilotToUpdate.positionX = coordinate.positionX;
    pilotToUpdate.positionY = coordinate.positionY;
    pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);

    await pilotRepository.save(pilotToUpdate);
  }

  /**
   * Update the time when the drone was seen most recently.
   * @param pilotId
   * @param time
   */
  static async updateLastSeenTime(pilotId: string, time: string) {
    const pilotToUpdate = await PilotStorage.findPilotById(pilotId);
    pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);

    await pilotRepository.save(pilotToUpdate);
  }

  /**
   * Delete all pilots more than 10 minutes
   * since they were detected in the monitoring zone.
   */
  static async deleteOldData() {
    const now = new Date().toISOString();
    const nowInSqlFormat = dateIsoStringToMySqlDateTime(now);

    await pilotRepository
      .createQueryBuilder("pilot")
      .delete()
      .where(
        `pilot.lastSeenAt <= SUBTIME("${nowInSqlFormat}", "${OLD_DATA_TIME_GAP}")`
      )
      .execute();
  }

  /**
   * Get the all pilot data in the pilot table.
   */
  static async getAllPilots() {
    const violators = await pilotRepository.find();
    return violators;
  }
}
