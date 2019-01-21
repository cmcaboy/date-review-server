// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { ReviewResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Review: ResolverMap = {
  ...ReviewResolvers.defaultResolvers,
  author: ({ authorId }, _, { personLoader }) => personLoader.load(authorId),
  // dataSources.typeORM.findUser(authorId),
  person: ({ personId }, _, { personLoader }) => personLoader.load(personId),
  // dataSources.typeORM.findUser(personId),
  comments: ({ id }, _, { dataSources }) => dataSources.typeORM.findComments(id)
};
