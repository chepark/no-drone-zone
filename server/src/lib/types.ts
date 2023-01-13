export type DateISOString = string;

/**
 * Pilot data fetched from Reaktor API
 */

export interface PilotData {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: DateISOString;
  email: string;
}

/**
 * Drone data type that resides in the DroneReport below.
 */

export interface DroneData {
  serialNumber: string;
  model: string;
  manufacturer: string;
  mac: string;
  ipv4: string;
  ipv6: string;
  firmware: string;
  positionY: number;
  positionX: number;
  altitude: number;
}

/**
 * Type for the JSON parsed from the drone report written in XML.
 * The drone report is fetched from the Reaktor Drone API.
 */

export interface DroneReport {
  "?xml": {
    "@_version": string;
    "@_encoding": string;
  };
  report: {
    deviceInformation: {
      listenRange: number;
      deviceStarted: string;
      uptimeSeconds: number;
      updateIntervalMs: number;
      "@_deviceId": string;
    };
    capture: {
      drone: DroneData[];
      "@_snapshotTimestamp": DateISOString;
    };
  };
}

export type pilotDistanceRecord = false | number;
