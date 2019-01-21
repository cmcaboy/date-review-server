import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Person } from "./Person";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Person, person => person.photos, { onDelete: "CASCADE" })
  person: Person;

  @Column()
  personId: string;

  @UpdateDateColumn()
  updateDateTime: Date;

  @CreateDateColumn()
  createDate: Date;

  @VersionColumn()
  versionNumber: number;
}
