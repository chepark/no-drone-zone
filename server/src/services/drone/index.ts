import {
  NEST_COORDINATES,
  NO_DRONE_ZONE_MIN_RADIUS,
  REAKTOR_DRONE_API,
} from "../../lib/constants.js";

class Drone {
  serialNumber: string;
  positionX: number;
  positionY: number;
  distance: number;
  violatedNDZ: Boolean; // check if drone in No-Drone-Zone(NDZ)

  constructor(serialNumber: string, xCoordinate: number, yCoordinate: number) {
    this.serialNumber = serialNumber;
    this.positionX = xCoordinate;
    this.positionY = yCoordinate;
    this.distance = this.#calculateDistance(this.positionX, this.positionY);
    this.violatedNDZ = this.#checkViolation(this.distance);
  }

  #calculateDistance(xPosition: number, yPosition: number): number {
    // 2D Distance Formula: Distance = sqrt((x2 – x1)^2 + (y2 – y1)^2)

    const xDistancePower = Math.pow(xPosition - NEST_COORDINATES.X, 2);
    const yDistancePower = Math.pow(yPosition - NEST_COORDINATES.Y, 2);
    const distance = Math.sqrt(xDistancePower + yDistancePower);

    return distance;
  }

  #checkViolation(distance: number) {
    if (distance < NO_DRONE_ZONE_MIN_RADIUS) return true;
    return false;
  }

  static fetchDataFromReaktor() {}
}

export default Drone;
