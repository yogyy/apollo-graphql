import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react";
import { ApolloError, useQuery } from "@apollo/client";
import { GraphQLError } from "graphql";
import { ALL_MOVIES } from "@/lib/graphql/queries";

export const allMoviesData = {
  movies: [
    {
      "id": 1,
      "title": "Cold Prey III (Fritt Vilt III)",
      "genre": ["Horror", "Mystery", "Thriller"],
      "release_date": "12/28/2003",
      "rating": 9.1,
    },
  ],
};

export const successfulAllMoviesMock: MockedResponse[] = [
  {
    request: {
      query: ALL_MOVIES,
    },
    result: {
      data: allMoviesData,
    },
  },
];

export const erroredAllMoviesMock: MockedResponse[] = [
  {
    request: {
      query: ALL_MOVIES,
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
    }),
  },
];

export function getAllMoviesWrapper(mockData: MockedResponse[] = []) {
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <MockedProvider
      mocks={mockData}
      addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result } = renderHook(() => useQuery(ALL_MOVIES), { wrapper });
  return {
    result,
  };
}
