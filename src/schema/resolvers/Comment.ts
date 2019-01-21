// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { CommentResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Comment: ResolverMap = {
  ...CommentResolvers.defaultResolvers,
  author: ({ authorId }, _, { personLoader }) => personLoader.load(authorId),

  // dataSources.typeORM.findUser(authorId),
  review: ({ reviewId }, _, { reviewLoader }) => reviewLoader.load(reviewId)
  // dataSources.typeORM.findReview(reviewId)
};
