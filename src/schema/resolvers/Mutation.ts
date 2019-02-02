import { ResolverMap } from "../../types/ResolverType";
import { MutationResolvers } from "../../types/generated";

// import { MutationResolvers } from "../../types/generated";
// import { pubsub } from "../../pubsub/index";
// import { NEW_MESSAGE } from "../../pubsub/subscriptions";

// const { AuthenticationError } = require("apollo-server");

// const uuid = require("node-uuid");

export const Mutation: ResolverMap = {
  ...MutationResolvers.defaultResolvers,
  newUser: (_, userArgs, { dataSources }) =>
    dataSources.typeORM.newUser(userArgs),
  newReview: (_, reviewArgs, { dataSources }) => {
    console.log("newReview resolver");
    return dataSources.typeORM.newReview(reviewArgs);
  },
  newUserAndReview: async (
    _,
    { title, description, rating, authorId, ...userArgs },
    { dataSources }
  ) => {
    const newUser = await dataSources.typeORM.newUser(userArgs);
    const personId = newUser.id; // grab id for new user

    const firstReview = await dataSources.typeORM.newReview({
      title,
      description,
      rating,
      personId,
      authorId
    });
    return firstReview;
  },
  newComment: (_, commentArgs, { dataSources }) =>
    dataSources.typeORM.newComment(commentArgs),
  newPlatform: (_, platformArgs, { dataSources }) =>
    dataSources.typeORM.newPlatform(platformArgs),
  editUser: (_, userArgs, { dataSources }) =>
    dataSources.typeORM.editUser(userArgs),
  editReview: (_, reviewArgs, { dataSources }) =>
    dataSources.typeORM.editReview(reviewArgs),
  editComment: (_, commentArgs, { dataSources }) =>
    dataSources.typeORM.editComment(commentArgs),
  // return true if operation succeeds; an Error will be thrown if
  // the request fails
  deleteUser: async (_, { id }, { dataSources }) =>
    dataSources.typeORM.deleteUser(id) && true,
  deleteReview: async (_, { id }, { dataSources }) =>
    dataSources.typeORM.deleteReview(id) && true,
  deleteComment: async (_, { id }, { dataSources }) =>
    dataSources.typeORM.deleteComment(id) && true,
  deletePhoto: (_, { id }, { dataSources }) =>
    dataSources.typeORM.deletePhoto(id) && true
};
