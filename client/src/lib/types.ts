type Decimal = string;
type IsoDateString = string;

export interface ViolatorData {
  pilotId: string;
  name: string;
  phoneNumber: string;
  email: string;
  distance: number;
  positionX: Decimal;
  positionY: Decimal;
  lastSeenAt: IsoDateString;
  colorCode?: string;
}
