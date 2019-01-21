// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { PersonResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Person: ResolverMap = {
  ...PersonResolvers.defaultResolvers,
  photos: ({ id: personId }, _, { dataSources }) => {
    console.log("User.photos userId: ", personId);
    return dataSources.typeORM.findPhotos(personId);
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
    dataSources.typeORM.findCommentsByAuthor(authorId)
};
