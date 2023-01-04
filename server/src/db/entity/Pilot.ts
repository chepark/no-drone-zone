import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

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
