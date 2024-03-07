import { Movie, User } from "@/types";
import { TypedDocumentNode, gql } from "@apollo/client";

const ALL_MOVIES: TypedDocumentNode<{ movies: Movie[] }> = gql`
  query getAllMovies {
    movies {
      id
      title
      genre
      release_date
      rating
    }
  }
`;

const ALL_USERS: TypedDocumentNode<{ users: User[] }> = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const GET_MOVIE_BY_TITLE: TypedDocumentNode<{ movie: Movie }> = gql`
  query getMovie($title: String!) {
    movie(title: $title) {
      title
      genre
      release_date
      rating
    }
  }
`;

export { ALL_MOVIES, ALL_USERS, GET_MOVIE_BY_TITLE };
