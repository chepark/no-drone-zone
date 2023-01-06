var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static findPilotById(pilotId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilot = yield pilotRepository.findOneBy({ pilotId });
            return pilot;
        });
    }
    /**
     * Create a new row.
     * @param data - pilot inforamtion
     * @param distance - current distance between the drone and the bird's nest.
     * @param coordinates - XY position within the monitoring zone.
     * @param timeStamp - The timestamp when the drone was detected.
     */
    static createPilot(data, distance, coordinates, timeStamp) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield pilotRepository.save(pilot);
        });
    }
    /**
     * Update the cloesest distance and last seen timestamp.
     * @param pilotId
     * @param distance - current distance between the drone and the bird's nest.
     * @param coordinate - XY position within the monitoring zone.
     * @param time - The timestamp when the drone was detected.
     */
    static updateDistanceLastSeenTime(pilotId, distance, coordinate, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilotToUpdate = yield PilotStorage.findPilotById(pilotId);
            pilotToUpdate.distance = distance;
            pilotToUpdate.positionX = coordinate.positionX;
            pilotToUpdate.positionY = coordinate.positionY;
            pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);
            yield pilotRepository.save(pilotToUpdate);
        });
    }
    /**
     * Update the time when the drone was seen most recently.
     * @param pilotId
     * @param time
     */
    static updateLastSeenTime(pilotId, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilotToUpdate = yield PilotStorage.findPilotById(pilotId);
            pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);
            yield pilotRepository.save(pilotToUpdate);
        });
    }
    /**
     * Delete all pilots more than 10 minutes
     * since they were detected in the monitoring zone.
     */
    static deleteOldData() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date().toISOString();
            const nowInSqlFormat = dateIsoStringToMySqlDateTime(now);
            yield pilotRepository
                .createQueryBuilder("pilot")
                .delete()
                .where(`pilot.lastSeenAt <= SUBTIME("${nowInSqlFormat}", "${OLD_DATA_TIME_GAP}")`)
                .execute();
        });
    }
    /**
     * Get the all pilot data in the pilot table.
     */
    static getAllPilots() {
        return __awaiter(this, void 0, void 0, function* () {
            const violators = yield pilotRepository.find();
            return violators;
        });
    }
}
//# sourceMappingURL=PilotStorage.services.js.map