import { waitFor } from "@/lib/test-utils";
import { describe, expect, test } from "vitest";
import {
  allUsersData,
  getAllUsersWrapper,
  erroredAllUsersMock,
  successfulAllUsersMock,
} from "../__mocks__/users-mocks";

import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

describe("should render data", () => {
  const { result } = getAllUsersWrapper(successfulAllUsersMock);

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
        data: allUsersData,
      });
    });
  });
});

describe("should render error", () => {
  const { result } = getAllUsersWrapper(erroredAllUsersMock);

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
