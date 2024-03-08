import { act, render, screen, waitFor } from "@/lib/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

import {
  movieData,
  getMovieWrapper,
  erroredMovieMock,
  successfulMovieMock,
} from "../__mocks__/search-movie-mocks";
import { SearchMovieForm } from "@/components/search-movie-form";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

describe("render SearchMovie", () => {
  const { result } = getMovieWrapper(successfulMovieMock);

  test("should render search movie form(input and button)", async () => {
    const onChangeMock = vi.fn();
    const onSubmitMock = vi.fn();

    beforeEach(() => {
      onChangeMock.mockClear();
      onSubmitMock.mockClear();
    });
    render(
      <SearchMovieForm
        onChange={onChangeMock}
        onSubmit={onSubmitMock}
        disabled={true}
      />
    );

    const searchForm = screen.getByTestId("movie-form");
    const searchInput = screen.queryByPlaceholderText(/Search Movie/i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();

    const { fetch } = result.current;
    await act(async () => {
      await fetch({
        variables: { title: "cold" },
      });
    });
  });

  test("should be return data search movie ", async () => {
    await waitFor(() => {
      const { data, error, loading } = result.current;
      expect({ data, error, loading }).toEqual({
        data: movieData,
        loading: false,
        error: undefined,
      });
    });
  });

  test("should be return error", async () => {
    const { result } = getMovieWrapper(erroredMovieMock);

    expect(result).toBeDefined();
    await act(async () => {
      await result.current.fetch({
        variables: { title: "cold" },
      });
    });
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
