var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Drone_instances, _Drone_calculateDistance, _Drone_checkViolation;
import { NEST_COORDINATES, NO_DRONE_ZONE_MIN_RADIUS, } from "../../lib/constants.js";
/**
 * Handles the original data fetched
 * from Reaktor API {@link https://assignments.reaktor.com/birdnest/drones}
 * before saving into the DB.
 *
 * The module achieves the two main purposes.
 * 1. Calculate the distance between the drone and the bird's nest using positionX and positionY values.
 * 2. Check if the drone breaks into NDZ.
 *
 * @module Drone
 */
class Drone {
    constructor(serialNumber, xCoordinate, yCoordinate) {
        _Drone_instances.add(this);
        this.serialNumber = serialNumber;
        this.positionX = xCoordinate;
        this.positionY = yCoordinate;
        this.distance = __classPrivateFieldGet(this, _Drone_instances, "m", _Drone_calculateDistance).call(this, this.positionX, this.positionY);
        this.violatedNDZ = __classPrivateFieldGet(this, _Drone_instances, "m", _Drone_checkViolation).call(this, this.distance);
    }
}
_Drone_instances = new WeakSet(), _Drone_calculateDistance = function _Drone_calculateDistance(xPosition, yPosition) {
    // Divided by 1000 to turn coordinate unit into meters
    const xDistancePower = Math.pow(xPosition - NEST_COORDINATES.X / 1000, 2);
    const yDistancePower = Math.pow(yPosition - NEST_COORDINATES.Y / 1000, 2);
    const distance = Math.sqrt(xDistancePower + yDistancePower);
    return distance;
}, _Drone_checkViolation = function _Drone_checkViolation(distance) {
    if (distance < NO_DRONE_ZONE_MIN_RADIUS)
        return true;
    return false;
};
export default Drone;
//# sourceMappingURL=Drone.js.map