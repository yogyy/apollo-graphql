import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import { typeDefs } from "../schema/typeDef.js";
import { resolvers } from "../schema/resolver.js";
import { createYoga } from "graphql-yoga";
import cors from "cors";
import express from "express";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});
// const server = createServer(yoga);
// server.listen(6000, () => {
//   console.log("Server is running on http://localhost:6000/graphql");
// });

const app = express();
app.use(cors());
// app.use(express.json());
app.use(yoga.graphqlEndpoint, yoga);

export default app;
