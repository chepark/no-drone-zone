import {
  NEST_COORDINATES,
  NO_DRONE_ZONE_MIN_RADIUS,
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

    // Divided by 1000 to turn coordinate unit into meters
    const xDistancePower = Math.pow(
      xPosition / 1000 - NEST_COORDINATES.X / 1000,
      2
    );
    const yDistancePower = Math.pow(
      yPosition / 1000 - NEST_COORDINATES.Y / 1000,
      2
    );
    const distance = Math.sqrt(xDistancePower + yDistancePower);

    return distance;
  }

  #checkViolation(distance: number) {
    if (distance < NO_DRONE_ZONE_MIN_RADIUS) return true;
    return false;
  }
}

export default Drone;
