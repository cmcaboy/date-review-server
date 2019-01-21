import { Photo } from "./Photo";
import { Platform } from "./Platform";
import { Review } from "./Review";
import { Comment } from "./Comment";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  VersionColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  BaseEntity
} from "typeorm";

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  instagramId: string;

  @Column()
  email: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => Platform, platform => platform.persons, { nullable: true })
  platform: Platform;

  @Column({ nullable: true })
  platformId: string;

  @OneToMany(() => Photo, photo => photo.person)
  photos: Photo[];

  @OneToMany(() => Review, review => review.person)
  reviews: Review[];

  @OneToMany(() => Review, review => review.author)
  authoredReviews: Review[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @UpdateDateColumn()
  updateDateTime: Date;

  @CreateDateColumn()
  createDate: Date;

  @VersionColumn()
  versionNumber: number;
}
