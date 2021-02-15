import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Place from "./Place";

@Entity("placesevents")
export default class PlaceEvent {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("timestamp with time zone")
  startDay!: Date;

  @Column("timestamp with time zone")
  endDay!: Date;

  @Column()
  year!: string;

  @Column({
    unique: true,
  })
  place_id!: string;

  @ManyToOne(() => Place)
  @JoinColumn({ name: "place_id" })
  place!: Place;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
