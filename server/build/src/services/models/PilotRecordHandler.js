var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PilotRecordHandler_instances, _PilotRecordHandler_checkDistanceRecord;
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
    constructor(pilotData, distance, time, record) {
        _PilotRecordHandler_instances.add(this);
        const { pilotId, firstName, lastName, phoneNumber, email } = pilotData;
        this.pilotId = pilotId;
        this.name = `${firstName} ${lastName}`;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.distance = distance;
        this.closestDistance = __classPrivateFieldGet(this, _PilotRecordHandler_instances, "m", _PilotRecordHandler_checkDistanceRecord).call(this, record);
        this.lastSeenAt = time;
    }
}
_PilotRecordHandler_instances = new WeakSet(), _PilotRecordHandler_checkDistanceRecord = function _PilotRecordHandler_checkDistanceRecord(record = false) {
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
        }
        else {
            this.updateRecord = false;
            return record;
        }
    }
};
export default PilotRecordHandler;
//# sourceMappingURL=PilotRecordHandler.js.map