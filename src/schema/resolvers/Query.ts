// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { QueryResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

// It doesn't make sense to use dataSources here since
// TypeORM takes care of it for us.

export const Query: ResolverMap = {
  ...QueryResolvers.defaultResolvers,
  person: (_, { id }, { dataSources }) => dataSources.typeORM.findUser(id),
  review: (_, { id }, { dataSources }) => dataSources.typeORM.findReview(id),
  comment: (_, { id }, { dataSources }) => dataSources.typeORM.findComment(id),
  findUsers: async (_, searchParams, { dataSources }) => {
    return dataSources.typeORM.findUsers(searchParams);
  },
  findReviews: (_, { userId: id }, { dataSources }) =>
    dataSources.typeORM.findReviews(id),
  findComments: (_, { reviewID: id }, { dataSources }) =>
    dataSources.typeORM.findComments(id),
  platform: (_, { id }, { dataSources }) =>
    dataSources.typeORM.findPlatform(id),
  findAllPlatforms: (_, __, { dataSources }) =>
    dataSources.typeORM.findAllPlatforms(),
  findPhoto: (_, { userId: id }, { dataSources }) =>
    dataSources.typeORM.findPhoto(id),
  findPhotos: (_, { userId: id }, { dataSources }) =>
    dataSources.typeORM.findPhotos(id),
  findAllPhotos: (_, __, { dataSources }) => dataSources.typeORM.findAllPhotos()
};
