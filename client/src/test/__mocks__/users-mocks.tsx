import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook } from "@testing-library/react";
import { ApolloError, useQuery } from "@apollo/client";
import { GraphQLError } from "graphql";
import { ALL_USERS } from "@/lib/graphql/queries";

export const allUsersData = {
  users: [
    {
      "id": 1,
      "name": "Rafael Pedrocco",
      "username": "rpedrocco0",
      "age": 32,
      "nationality": "INDONESIA",
    },
  ],
};

export const successfulAllUsersMock: MockedResponse[] = [
  {
    request: {
      query: ALL_USERS,
    },
    result: {
      data: allUsersData,
    },
  },
];

export const erroredAllUsersMock: MockedResponse[] = [
  {
    request: {
      query: ALL_USERS,
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops the fetch was unsuccessful!")],
    }),
  },
];

export function getAllUsersWrapper(mockData: MockedResponse[] = []) {
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <MockedProvider
      mocks={mockData}
      addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result } = renderHook(() => useQuery(ALL_USERS), { wrapper });
  return {
    result,
  };
}
