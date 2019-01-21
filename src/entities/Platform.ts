import { Person } from "./Person";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany
} from "typeorm";

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Person, person => person.platform)
  persons: Person[];

  @UpdateDateColumn()
  updateDateTime: Date;

  @CreateDateColumn()
  createDate: Date;

  @VersionColumn()
  versionNumber: number;
}
