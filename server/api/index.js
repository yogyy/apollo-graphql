import express from "express";
import { typeDefs } from "../schema/typeDef.js";
import { resolvers } from "../schema/resolver.js";
import { createYoga, createSchema } from "graphql-yoga";
import cors from "cors";

const schema = createSchema({ typeDefs, resolvers });

export const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  graphiql: false,
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://yogyy.github.io/"],
  })
);
// app.use(express.json());
app.use(yoga.graphqlEndpoint, yoga);

export default app;
