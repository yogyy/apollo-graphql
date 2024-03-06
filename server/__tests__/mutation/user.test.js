import { describe, expect, test } from "vitest";
import app from "../../api/index.js";
import request from "supertest";

describe("Mutation", () => {
  test("should create new user", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          mutation Mutation($input: CreateUserInput!) {
            createUser(input: $input) {
              name
              username
            }
          }
        `,
        variables: {
          "input": {
            "name": "john",
            "username": "constantine",
            "age": 21,
          },
        },
      });

    expect(res.status).toBe(200);
  });

  test("should update user's username", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          mutation Mutation($input: UpdateUserInput!) {
            updateUser(input: $input) {
              name
              username
            }
          }
        `,
        variables: {
          "input": {
            "id": "1",
            "newUsername": "constantine",
          },
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual({
      updateUser: {
        "name": "Rafael Pedrocco",
        "username": "constantine",
      },
    });
  });

  test("should delete user by id", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          mutation Mutation($id: ID!) {
            deleteUser(id: $id) {
              id
            }
          }
        `,
        variables: { "id": "21" },
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toEqual({ deleteUser: null });
  });
});
