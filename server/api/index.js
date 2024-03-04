import { makeExecutableSchema } from "@graphql-tools/schema";
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

const app = express();

app.use(
  cors({ origin: ["http://localhost:5173", "https://yogyy.github.io/"] })
);
// app.use(express.json());
app.use(yoga.graphqlEndpoint, yoga);

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000/graphql");
// }); //for local use this

export default app;
