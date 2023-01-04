var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Drone_instances, _Drone_calculateDistance, _Drone_checkViolation;
import { NEST_COORDINATES, NO_DRONE_ZONE_MIN_RADIUS, } from "../../lib/constants.js";
class Drone {
    // timeStamp: string; // change data type?
    constructor(serialNumber, xCoordinate, yCoordinate
    // time: string
    ) {
        _Drone_instances.add(this);
        this.serialNumber = serialNumber;
        this.positionX = xCoordinate;
        this.positionY = yCoordinate;
        this.distance = __classPrivateFieldGet(this, _Drone_instances, "m", _Drone_calculateDistance).call(this, this.positionX, this.positionY);
        this.violatedNDZ = __classPrivateFieldGet(this, _Drone_instances, "m", _Drone_checkViolation).call(this, this.distance);
        // this.timeStamp = time;
    }
}
_Drone_instances = new WeakSet(), _Drone_calculateDistance = function _Drone_calculateDistance(xPosition, yPosition) {
    // 2D Distance Formula: Distance = sqrt((x2 – x1)^2 + (y2 – y1)^2)
    // Divided by 1000 to turn coordinate unit into meters
    const xDistancePower = Math.pow(xPosition / 1000 - NEST_COORDINATES.X / 1000, 2);
    const yDistancePower = Math.pow(yPosition / 1000 - NEST_COORDINATES.Y / 1000, 2);
    const distance = Math.sqrt(xDistancePower + yDistancePower);
    return distance;
}, _Drone_checkViolation = function _Drone_checkViolation(distance) {
    if (distance < NO_DRONE_ZONE_MIN_RADIUS)
        return true;
    return false;
};
export default Drone;
//# sourceMappingURL=Drone.js.map