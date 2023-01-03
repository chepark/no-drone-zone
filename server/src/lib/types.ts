export type DateISOString = string;

export interface PilotData {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: DateISOString;
  email: string;
}

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
