// import { Resolvers } from "../../types/generated";

import { Query } from "./Query";
import { Mutation } from "./Mutation";
// import { Subscription } from "./Subscription";
import { Comment } from "./Comment";
import { Photo } from "./Photo";
import { Platform } from "./Platform";
import { Review } from "./Review";
import { Person } from "./Person";
// import { Resolvers } from "../../types/generated";
import { IResolvers } from "graphql-tools";

export const resolvers: IResolvers = {
  Mutation,
  Query,
  Comment,
  Photo,
  Platform,
  Review,
  Person
};
