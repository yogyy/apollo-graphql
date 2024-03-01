import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";
import { typeDefs } from "../schema/typeDef.js";
import { resolvers } from "../schema/resolver.js";

const schema = makeExecutableSchema({ typeDefs, resolvers });

/**
 * GraphQL API
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  const { query, variables } = JSON.parse(req.body);
  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
  });
  res.send(200).json(result);
};
