import { GraphQLError } from "graphql";
import { renderHook } from "@testing-library/react";
import { GET_MOVIE_BY_TITLE } from "@/lib/graphql/queries";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

export const movieData = {
  movie: [
    {
      "title": "Cold Prey III (Fritt Vilt III)",
      "genre": ["Horror", "Mystery", "Thriller"],
      "release_date": "12/28/2003",
      "rating": 9.1,
    },
  ],
};

export const successfulMovieMock: MockedResponse[] = [
  {
    request: {
      query: GET_MOVIE_BY_TITLE,
      variables: { title: "cold" },
    },
    result: {
      data: movieData,
    },
  },
];

export const erroredMovieMock: MockedResponse[] = [
  {
    request: {
      query: GET_MOVIE_BY_TITLE,
      variables: { title: "cold" },
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
    }),
  },
];

export const useGetMovie = () => {
  const [fetch, { data, loading, error }] = useLazyQuery(GET_MOVIE_BY_TITLE, {
    variables: { title: "cold" },
  });

  return { fetch, data, loading, error };
};

export function getMovieWrapper(mockData: MockedResponse[] = []) {
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <MockedProvider
      mocks={mockData}
      addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result } = renderHook(() => useGetMovie(), {
    wrapper,
  });
  return {
    result,
  };
}
