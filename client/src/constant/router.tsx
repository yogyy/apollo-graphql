import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "@/routes/root";
import ErrorPage from "../routes/error";
import { UsersData } from "@/components/users-data";
import { MoviesData } from "@/components/movies-data";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      errorElement={<ErrorPage />}
      element={<Root />}>
      <Route
        path="users"
        element={<UsersData />}
      />
      <Route
        path="movies"
        element={<MoviesData />}
      />
    </Route>
  ),
  {
    basename: "/apollo-graphql",
  }
);
export { router };
