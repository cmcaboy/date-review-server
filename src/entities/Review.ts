import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Person } from "./Person";
import { Comment } from "./Comment";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => Person, person => person.authoredReviews, {
    onDelete: "CASCADE"
  })
  author: Person;

  @Column()
  authorId: string;

  @ManyToOne(() => Person, person => person.reviews, { onDelete: "CASCADE" })
  person: Person;

  @Column()
  personId: string;

  @OneToMany(() => Comment, comment => comment.review)
  comments: Comment[];

  @UpdateDateColumn()
  updateDateTime: Date;

  @CreateDateColumn()
  createDate: Date;

  @VersionColumn()
  versionNumber: number;
}
