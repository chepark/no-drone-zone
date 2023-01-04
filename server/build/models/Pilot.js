var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pilot_instances, _Pilot_checkDistanceRecord;
class Pilot {
    constructor(pilotData, distance, time, record) {
        _Pilot_instances.add(this);
        const { pilotId, firstName, lastName, phoneNumber, email } = pilotData;
        this.pilotId = pilotId;
        this.name = `${firstName} ${lastName}`;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.distance = distance;
        this.closestDistance = __classPrivateFieldGet(this, _Pilot_instances, "m", _Pilot_checkDistanceRecord).call(this, record);
        this.timeStamp = time;
    }
}
_Pilot_instances = new WeakSet(), _Pilot_checkDistanceRecord = function _Pilot_checkDistanceRecord(record = false) {
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
export default Pilot;
//# sourceMappingURL=Pilot.js.map