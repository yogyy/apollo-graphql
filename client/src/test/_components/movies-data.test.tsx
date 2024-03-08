import { waitFor } from "@/lib/test-utils";
import { describe, expect, test } from "vitest";
import {
  allMoviesData,
  getAllMoviesWrapper,
  erroredAllMoviesMock,
  successfulAllMoviesMock,
} from "../__mocks__/movies-mocks";

import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

describe("should render data", () => {
  const { result } = getAllMoviesWrapper(successfulAllMoviesMock);

  test("should render skeleton loading", async () => {
    expect(result).toBeDefined();

    waitFor(() => {
      const { data, error, loading } = result.current;
      expect({ data, error, loading }).toEqual({
        loading: true,
        error: undefined,
        data: undefined,
      });
    });
  });
  test("should render data from useQuery", async () => {
    expect(result).toBeDefined();

    await waitFor(() => {
      const { data, error, loading } = result.current;
      expect({ data, error, loading }).toEqual({
        loading: false,
        error: undefined,
        data: allMoviesData,
      });
    });
  });
});

describe("should render error", () => {
  const { result } = getAllMoviesWrapper(erroredAllMoviesMock);

  test("should be define and then return error", async () => {
    expect(result).toBeDefined();

    await waitFor(() => {
      const { data, error, loading } = result.current;
      expect({ data, error, loading }).toEqual({
        loading: false,
        error: new ApolloError({
          graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
        }),
        data: undefined,
      });
    });
  });
});
