import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "@/routes/root";
import ErrorPage from "@/routes/error";
import UsersPage from "@/routes/users";
import MoviesPage from "@/routes/movies";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      errorElement={<ErrorPage />}
      element={<Root />}>
      <Route
        path="users"
        element={<UsersPage />}
      />
      <Route
        path="movies"
        element={<MoviesPage />}
      />
    </Route>
  ),
  {
    basename: "/apollo-graphql",
  }
);

export { router };
