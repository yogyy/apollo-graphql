const typeDefs = ` #graphql
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
    friends: [User]
    favoriteMovies(genre: String!): [Movie]
  }

  type Movie {
    id: ID!
    title: String!
    genre: [String]!
    release_date: String!
    rating: Float!
  }

   type Query {
    users: [User!]!
    user(id: ID!): User
    movies: [Movie!]!
    movie(title: String!): Movie
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDONESIA
  }

  input UpdateUserInput {
    id: ID!
    newUsername: String!
  }
 
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    INDONESIA
    JAPAN
    MALAYSIA
    PHILIPPINES
    SINGAPORE
  }
`;

export { typeDefs };
