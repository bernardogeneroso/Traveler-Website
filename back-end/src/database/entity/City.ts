import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import Place from "./Place";

@Entity("cities")
export default class City {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column("text")
  description!: string;

  @Column()
  locals!: number;

  @OneToMany(() => Place, (places) => places.city_id)
  places!: Place;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
