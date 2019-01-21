// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { PhotoResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Photo: ResolverMap = {
  ...PhotoResolvers.defaultResolvers,
  person: async ({ personId }, _, { personLoader }) =>
    personLoader.load(personId)
  // dataSources.typeORM.findUser(personId);
};
