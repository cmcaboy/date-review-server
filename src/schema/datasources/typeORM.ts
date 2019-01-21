import { Connection, Repository } from "typeorm";
import { Person } from "../../entities/Person";
import { Comment } from "../../entities/Comment";
import { Review } from "../../entities/Review";
import { Photo } from "../../entities/Photo";
import { Platform } from "../../entities/Platform";

const { DataSource } = require("apollo-datasource");

export default class typeORM extends (DataSource as { new (): any }) {
  personRepository: Repository<Person>;
  commentRepository: Repository<Comment>;
  reviewRepository: Repository<Review>;
  photoRepository: Repository<Photo>;
  platformRepository: Repository<Platform>;
  connection: Connection;
  constructor({ connection }: { connection: Connection }) {
    super();
    // Create a connection to postgres
    this.connection = connection;
    // Create Repositories for each TypeORM entity we use
    this.personRepository = this.connection.getRepository(Person);
    this.reviewRepository = this.connection.getRepository(Review);
    this.commentRepository = this.connection.getRepository(Comment);
    this.photoRepository = this.connection.getRepository(Photo);
    this.platformRepository = this.connection.getRepository(Platform);

    // console.log("typeORM class");
  }

  initialize(config: any) {
    this.context = config.context;
  }

  findUser = (id: string): Promise<Person | undefined> =>
    this.personRepository.findOne(id);

  findReview = (id: string) => this.reviewRepository.findOne(id);

  findComment = (id: string) => this.commentRepository.findOne(id);

  findUsers = (searchParams: any) =>
    this.personRepository.find({ ...searchParams });

  findUsersFromPlatform = (platformId: any) =>
    this.personRepository.find({ platformId });

  // returns reviews attached to a user
  findReviews = async (id: string) => {
    const reviews = await this.reviewRepository.find({ personId: id });
    return reviews;
  };

  findAuthoredReviews = (id: string) =>
    this.reviewRepository.find({ authorId: id });

  // returns comments attached to a review
  findComments = (id: string) =>
    // this.reviewRepository.findOne(id, { relations: ["comments"] });
    this.commentRepository.find({ reviewId: id });

  findCommentsByAuthor = (authorId: string) =>
    this.commentRepository.find({ authorId });

  findAllPlatforms = () => this.platformRepository.find();

  findAllPhotos = () => this.photoRepository.find();

  findPhoto = (id: string) => this.photoRepository.findOne(id);

  newUser = async ({
    photos,
    platform,
    ...userArgs
  }: {
    photos: string[];
    platform: string;
  }) => {
    const newUser = await this.personRepository.create({
      ...userArgs,
      platformId: platform,
      isActive: true
    });
    const ret = await this.personRepository.save(newUser);
    await Promise.all(
      photos.map(async photo => {
        const photoInst = await this.photoRepository.create({
          personId: newUser.id,
          url: photo
        });
        // console.log("photoInst: ", photoInst);
        return this.photoRepository.save(photoInst);
      })
    );
    return ret;
  };

  newReview = async ({
    authorId,
    personId,
    ...reviewArgs
  }: {
    authorId: string;
    personId: string;
  }) => {
    // Build review row
    const review = await this.reviewRepository.create({
      ...reviewArgs,
      authorId,
      personId
    });
    return this.reviewRepository.save(review);
  };

  newComment = async ({
    authorId,
    reviewId,
    ...commentArgs
  }: {
    authorId: string;
    reviewId: string;
  }) => {
    const comment = await this.commentRepository.create({
      ...commentArgs,
      authorId,
      reviewId
    });
    return this.commentRepository.save(comment);
  };

  newPlatform = async (platformArgs: any) => {
    const newPlatform = await this.platformRepository.create({
      ...platformArgs
    });
    return this.platformRepository.save(newPlatform);
  };

  editUser = async ({
    id,
    photos,
    ...rest
  }: {
    id: string;
    photos: string[];
  }) => {
    await this.personRepository.update(id, { ...rest });
    // console.log("photos: ", photos);
    const ret = await this.personRepository.findOne(id);
    // console.log("ret: ", ret);
    // const ret = this.personRepository.save(user as DeepPartial<Person>);
    // Update photos if neccessary
    if (photos) {
      // If photos are specified, remove all photos and create new ones
      // Remove old photos
      await this.photoRepository.delete({ personId: id });
      await Promise.all(
        photos.map(async photo => {
          const photoInst = await this.photoRepository.create({
            personId: id,
            url: photo
          });
          // console.log("photoInst: ", photoInst);
          return this.photoRepository.save(photoInst);
        })
      );
    }
    return ret;
  };

  editReview = async ({ id, ...rest }: { id: string }) => {
    // console.log("rest: ", rest);

    await this.reviewRepository.update(id, { ...rest });
    return this.reviewRepository.findOne(id);
    // return this.reviewRepository.save(review);
  };

  editComment = async ({ id, ...rest }: { id: string }) => {
    await this.commentRepository.update(id, { ...rest });
    return this.commentRepository.findOne(id);
  };

  deleteUser = (id: string) => this.personRepository.delete(id);

  deleteReview = (id: string) => this.reviewRepository.delete(id);

  deleteComment = (id: string) => this.commentRepository.delete(id);

  deletePhoto = (id: string) => this.photoRepository.delete(id);

  // findPhotos
  findPhotos = async (userId: string) => {
    // console.log("findPhotos userId: ", userId);
    const photos = await this.photoRepository.find({
      where: { personId: userId }
    });
    // console.log("photos: ", photos);
    return photos;
  };

  // findPlatform
  findPlatform = (platformId: string) =>
    this.platformRepository.findOne(platformId);

  findPlatformByUser = async (id: string) => {
    const person = await this.personRepository.findOne(id);
    if (person) {
      return person.platform;
    }
    return null;
  };
}
