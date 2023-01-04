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
export class PilotStorage {
    static findPilotById(pilotId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilot = yield pilotRepository.findOneBy({ pilotId });
            return pilot;
        });
    }
    static createPilot(data, distance, timeStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pilotId, firstName, lastName, phoneNumber, email } = data;
            const pilot = new Pilot();
            pilot.pilotId = pilotId;
            pilot.name = `${firstName} ${lastName}`;
            pilot.phoneNumber = phoneNumber;
            pilot.email = email;
            pilot.distance = distance;
            pilot.lastSeenAt = dateIsoStringToMySqlDateTime(timeStamp);
            yield pilotRepository.save(pilot);
        });
    }
    static updateDistanceLastSeenTime(pilotId, distance, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilotToUpdate = yield PilotStorage.findPilotById(pilotId);
            pilotToUpdate.distance = distance;
            pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);
            yield pilotRepository.save(pilotToUpdate);
        });
    }
    static updateLastSeenTime(pilotId, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const pilotToUpdate = yield PilotStorage.findPilotById(pilotId);
            pilotToUpdate.lastSeenAt = dateIsoStringToMySqlDateTime(time);
            yield pilotRepository.save(pilotToUpdate);
        });
    }
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
    static getAllPilots() {
        return __awaiter(this, void 0, void 0, function* () {
            const violators = yield pilotRepository.find();
            return violators;
        });
    }
}
//# sourceMappingURL=PilotStorage.services.js.map