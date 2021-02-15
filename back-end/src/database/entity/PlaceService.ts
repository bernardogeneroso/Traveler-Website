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

@Entity("placeservices")
export default class PlaceService {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  timeOpen!: string;

  @Column()
  order!: number;

  @Column() place_id!: string;

  @ManyToOne(() => Place)
  @JoinColumn({ name: "place_id" })
  place!: Place;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
