import { personLoader } from "../loaders/PersonLoader";
import { reviewLoader } from "../loaders/ReviewLoader";
import typeORM from "../schema/datasources/typeORM";

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface DataSources {
  typeORM: typeORM;
}

export interface Context {
  req: Express.Request;
  personLoader: ReturnType<typeof personLoader>;
  reviewLoader: ReturnType<typeof reviewLoader>;
  dataSources: DataSources;
}

export interface ResolverMap {
  [key: string]: Resolver;
}
