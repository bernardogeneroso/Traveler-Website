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

@Entity("evaluations")
export default class Evaluation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  avatar!: string;

  @Column("text")
  description!: string;

  @Column()
  rating!: number;

  @Column({ default: 0 })
  approved: number = 0;

  @Column() place_id!: string;

  @ManyToOne(() => Place)
  @JoinColumn({ name: "place_id" })
  place!: Place;

  @CreateDateColumn() created_at!: Date;

  @UpdateDateColumn() updated_at!: Date;
}
