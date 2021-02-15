import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import Categorie from "./Categorie";
import City from "./City";
import Evaluation from "./Evaluation";
import PlaceEvent from "./PlaceEvent";
import PlaceService from "./PlaceService";

@Entity("places")
export default class Place {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column("text")
  description!: string;

  @Column("varchar", { length: 22, nullable: true })
  phone_number!: string;

  @Column()
  address!: string;

  @Column("decimal", { precision: 2, scale: 1 })
  rating!: number;

  @OneToMany(() => Evaluation, (evaluations) => evaluations.place_id)
  evaluations!: Evaluation;

  @OneToMany(() => PlaceService, (placeServices) => placeServices.place_id)
  placeServices!: PlaceService;

  @OneToMany(() => PlaceEvent, (placeEvents) => placeEvents.place_id)
  placeEvents!: PlaceEvent;

  @Column() city_id!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: "city_id" })
  city!: City;

  @Column() categorie_id!: string;

  @ManyToOne(() => Categorie)
  @JoinColumn({ name: "categorie_id" })
  categorie!: Categorie;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
