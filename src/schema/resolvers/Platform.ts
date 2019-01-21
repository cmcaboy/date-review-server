// import { QueryResolvers } from '../../types/generated';
import { ResolverMap } from "../../types/ResolverType";
import { PlatformResolvers } from "../../types/generated";

// const { AuthenticationError } = require('apollo-server');

export const Platform: ResolverMap = {
  ...PlatformResolvers.defaultResolvers,
  persons: ({ id: platformId }, _, { dataSources }) =>
    dataSources.typeORM.findUsersFromPlatform(platformId)
};
