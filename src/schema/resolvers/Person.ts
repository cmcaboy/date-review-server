// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { PersonResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Person: ResolverMap = {
  ...PersonResolvers.defaultResolvers,
  photos: ({ id: personId }, _, { dataSources }) => {
    return dataSources.typeORM.findPhotos(personId);
  },
  profilePic: async ({ id: personId }, _, { dataSources }) => {
    const photos = await dataSources.typeORM.findPhotos(personId);
    return photos[0];
  },
  platform: ({ platformId }, _, { dataSources }) =>
    dataSources.typeORM.findPlatform(platformId),
  reviews: async ({ id: personId }, _, { dataSources }) => {
    const reviews = await dataSources.typeORM.findReviews(personId);
    return reviews;
  },
  authoredReviews: async ({ id: authorId }, _, { dataSources }) => {
    const reviews = await dataSources.typeORM.findAuthoredReviews(authorId);
    return reviews;
  },
  comments: ({ id: authorId }, _, { dataSources }) =>
    dataSources.typeORM.findCommentsByAuthor(authorId),
  numRatings: async ({ id: personId }, _, { dataSources }) => {
    const reviews = await dataSources.typeORM.findReviews(personId);
    return reviews.length;
  },
  averageRating: async ({ id: personId }, _, { dataSources }) => {
    const reviews = await dataSources.typeORM.findReviews(personId);
    if (!reviews.length) {
      return 0;
    }
    return (
      reviews.map(review => review.rating).reduce((prev, curr) => prev + curr) /
      reviews.length
    );
  }
};
