import express from "express";
import { typeDefs } from "../schema/typeDef.js";
import { resolvers } from "../schema/resolver.js";
import { createYoga, createSchema } from "graphql-yoga";
import cors from "cors";
import "dotenv/config";

const schema = createSchema({ typeDefs, resolvers });

export const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  graphiql: false,
});

const app = express();
app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "development" && "http://localhost:5173",
      "https://yogyy.github.io/",
      "https://yogyy-apollo.pages.dev/",
    ],
  })
);
// app.use(express.json());
app.use(yoga.graphqlEndpoint, yoga);

export default app;
