import find from "lodash.find";
import remove from "lodash.remove";
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
      if (title === "") return null;
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

  Mutation: {
    createUser: (_, { input }) => {
      const user = input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUser: (_, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (_, { id }) => {
      remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

export { resolvers };
