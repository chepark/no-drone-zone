import {
  NEST_COORDINATES,
  NO_DRONE_ZONE_MIN_RADIUS,
} from "../../lib/constants.js";

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
  serialNumber: string;
  positionX: number;
  positionY: number;
  distance: number;
  violatedNDZ: Boolean;

  constructor(serialNumber: string, xCoordinate: number, yCoordinate: number) {
    this.serialNumber = serialNumber;
    this.positionX = xCoordinate;
    this.positionY = yCoordinate;
    this.distance = this.#calculateDistance(this.positionX, this.positionY);
    this.violatedNDZ = this.#checkViolation(this.distance);
  }

  /**
   * Calculate the distance between the drone and the bird's nest.
   * Formula: Distance = sqrt((x2 – x1)^2 + (y2 – y1)^2)
   *
   * @private
   * @param xPosition - X coordinate of the drone.
   * @param yPosition - Y coordniate of the drone.
   * @returns The distance between the drone and the bird's nest.
   */

  #calculateDistance(xPosition: number, yPosition: number): number {
    // Divided by 1000 to turn coordinate unit into meters

    const xDistancePower = Math.pow(xPosition - NEST_COORDINATES.X / 1000, 2);
    const yDistancePower = Math.pow(yPosition - NEST_COORDINATES.Y / 1000, 2);
    const distance = Math.sqrt(xDistancePower + yDistancePower);

    return distance;
  }

  /**
   * Update the violation status based on the distance between the drone and the nest.
   *
   * @private
   * @param distance - The distance between the drone and the bird's nest.
   * @returns The NDZ violation status of the drone.
   */
  #checkViolation(distance: number): Boolean {
    if (distance < NO_DRONE_ZONE_MIN_RADIUS) return true;
    return false;
  }
}

export default Drone;
