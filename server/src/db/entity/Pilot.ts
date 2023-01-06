import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

/**
 * Class that maps to the database table.
 *
 * Table name: Pilot
 * Columns:
 * 1. pilotId
 * 2. name
 * 3. phoneNumber
 * 4. email
 * 5. positionX: X position of the drone that the pilot controlled.
 * 6. positionY: Y position of the drone that the pilot controlled
 * 7. distance: The record of the losest distance from the No Drone Zone.
 * 8. lastSeenAT
 */

@Entity()
export class Pilot extends BaseEntity {
  @PrimaryColumn("varchar")
  pilotId: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column({ type: "decimal", precision: 16, scale: 12 })
  positionX: number;

  @Column({ type: "decimal", precision: 16, scale: 12 })
  positionY: number;

  @Column({ type: "decimal", precision: 16, scale: 12 })
  distance: number;

  @Column({ type: "datetime" })
  lastSeenAt: Date;
}
