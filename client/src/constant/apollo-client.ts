import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_URI
  : "http://localhost:3000/graphql";

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export { client };
