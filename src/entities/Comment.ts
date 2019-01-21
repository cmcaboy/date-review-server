import { Review } from "./Review";
import { Person } from "./Person";
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

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Person, person => person.comments, { onDelete: "CASCADE" })
  author: Person;

  @Column()
  authorId: string;

  @Column()
  text: string;

  @ManyToOne(() => Review, review => review.comments, { onDelete: "CASCADE" })
  review: Review;

  @Column()
  reviewId: string;

  @UpdateDateColumn()
  updateDateTime: Date;

  @CreateDateColumn()
  createDate: Date;

  @VersionColumn()
  versionNumber: number;
}
