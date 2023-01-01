export interface Pilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: DateISOString;
  email: string;
}

export type DateISOString = string;
