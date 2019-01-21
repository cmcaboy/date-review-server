import "reflect-metadata";
const express = require("express");
import { Application } from "express";
// import { importSchema } from "graphql-import";
import typeORMAPI from "./schema/datasources/typeORM";
import { createConnection, Connection } from "typeorm";
import typeDefs from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers/index";
import { personLoader } from "./loaders/PersonLoader";

// import statement did not work here
const { ApolloServer } = require("apollo-server-express");
const { RedisCache } = require("apollo-server-cache-redis");

require("dotenv").config();
console.log("ENV: ", process.env.NODE_ENV);
console.log("REDIS_HOST: ", process.env.REDIS_HOST);
console.log("TYPEORM_HOST: ", process.env.TYPEORM_HOST);

createConnection()
  .then((connection: Connection) => {
    const playground: any = {
      settings: {
        "editor.cursorShape": "line"
      }
    };

    // const TYPEDEFS_PATH =
    //   process.env.NODE_ENV === "production"
    //     ? "./schema/typeDefs.graphql"
    //     : "./src/schema/typeDefs.graphql";

    // console.log("TYPEDEFS_PATH: ", TYPEDEFS_PATH);

    // const typeDefs = importSchema(TYPEDEFS_PATH);

    // context is information shared with all resolvers.
    // Here, I will pull out the header info from the request
    // and make sure the user is a valid user. Later, I will
    // use the roles parameter to validate the user has permission
    // to execute a specific query
    const context = async ({ req }: { req: any }) => {
      const auth = (req.headers && req.headers.authorization) || "";
      console.log("auth: ", auth);
      return { person: null, personLoader: personLoader() };
    };

    // set up the data sources our resolvers need
    const dataSources = () => ({
      typeORM: new typeORMAPI({ connection })
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground,
      context,
      cache: new RedisCache({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        url: process.env.REDIS_URL
      }),
      dataSources,
      engine: {
        apiKey: process.env.ENGINE_API_KEY
      }
    });

    const app: Application = express();
    const path: string = "/graphql";

    server.applyMiddleware({
      app,
      path
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`API is ready at ready at port ${process.env.PORT || 4000}`);
    });
  })
  .catch(e => console.log("Error starting API server: ", e));
