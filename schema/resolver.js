import find from "lodash.find";
import filter from "lodash.filter";
import includes from "lodash.includes";
import { MovieList, UserList } from "../fakeData.js";

const resolvers = {
  Query: {
    users: () => UserList,
    user: (_, { id }) => find(UserList, { id: Number(id) }),
    movies: () => MovieList,
    movie: (_, { title }) => {
      const filteredMovies = filter(MovieList, (movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
      );

      return filteredMovies[0];
    },
  },
  User: {
    favoriteMovies: (_, { genre }) => {
      const filteredMovies = filter(MovieList, (movie) => {
        // Case-insensitive matching (optional)
        genre = genre.toLowerCase();
        const movieGenres = movie.genre.map((g) => g.toLowerCase()); // Convert all genres to lowercase
        return includes(movieGenres, genre); // Check if any genre matches the provided one
      });
      return filteredMovies;
    },
  },
};

export { resolvers };
