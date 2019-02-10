// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { PhotoResolvers } from "../../types/generated";

export const Photo: PhotoResolvers.Type = {
  ...PhotoResolvers.defaultResolvers,

  person: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
