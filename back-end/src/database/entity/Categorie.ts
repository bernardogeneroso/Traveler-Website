import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import Place from "./Place";

@Entity("categories")
export default class Categorie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  iconName!: string;

  @OneToMany(() => Place, (places) => places.categorie_id)
  places!: Place;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
