import { PilotData } from "../lib/types.js";
import { AppDataSource } from "../config/data-source.js";
import { Pilot } from "../db/entity/Pilot.js";
import { dateIsoStringToMySqlDateTime } from "../lib/dateFormatter.js";
import { OLD_DATA_TIME_GAP } from "../lib/constants.js";

const pilotRepository = AppDataSource.getRepository(Pilot);

export class PilotStorage {
  static async findPilotById(pilotId: string) {
    const pilot = await pilotRepository.findOneBy({ pilotId });
    return pilot;
  }

  static async createPilot(
    data: PilotData,
    distance: number,
    timeStamp: string
  ) {
    const { pilotId, firstName, lastName, phoneNumber, email } = data;

    const pilot = new Pilot();
    pilot.pilotId = pilotId;
    pilot.name = `${firstName} ${lastName}`;
    pilot.phoneNumber = phoneNumber;
    pilot.email = email;
    pilot.distance = distance;
    pilot.lastSeenAt = dateIsoStringToMySqlDateTime(timeStamp);

    await pilotRepository.save(pilot);
  }

  static async updateDistanceLastSeenTime(
    pilotId: string,
    distance: number,
    time: string
  ) {
    const pilotToUpdate = await PilotStorage.findPilotById(pilotId);
    pilotToUpdate.distance = distance;
    pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);

    await pilotRepository.save(pilotToUpdate);
  }

  static async updateLastSeenTime(pilotId: string, time: string) {
    const pilotToUpdate = await PilotStorage.findPilotById(pilotId);
    pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);

    await pilotRepository.save(pilotToUpdate);
  }

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

  static async getAllPilots() {
    const violators = await pilotRepository.find();
    return violators;
  }
}
