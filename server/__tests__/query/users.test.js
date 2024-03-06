import { describe, expect, test } from "vitest";
import app from "../../api/index.js";
import request from "supertest";

describe("POST /graphql users", () => {
  test("should retrieve 415 Unsupported Media Type", async () => {
    const res = await request(app).post("/graphql");

    expect(res.status).toBe(415);
    expect(res.body).empty;
  });

  test("should retrieve all users data", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          query getAllUsers {
            users {
              name
              age
              nationality
            }
          }
        `,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("users");
    expect(res.body.data.users).toBeInstanceOf(Array);
  });
});

describe("POST /graphql user", () => {
  test("should retrieve user by id", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          query getUser($id: ID!) {
            user(id: $id) {
              name
            }
          }
        `,
        variables: { "id": "2" },
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toEqual({
      user: {
        name: "Glenn Pillman",
      },
    });
  });
});

describe("POST /graphql user", () => {
  test("should retrieve user with movie data and handle errors", async () => {
    const validQuery = /* GraphQL */ `
      query Query($userId: ID!, $genre: String!) {
        user(id: $userId) {
          name
          age
          nationality
          friends {
            name
          }
          favoriteMovies(genre: $genre) {
            title
            genre
            release_date
            rating
          }
        }
      }
    `;

    const invalidQuery = /* GraphQL */ `
      query {
        invalidQuery
      }
    `;

    const variables = {
      userId: "1",
      genre: "Action",
    };

    const validResponse = await request(app)
      .post("/graphql")
      .send({ query: validQuery, variables })
      .expect(200);

    expect(validResponse.body.data.user).toBeDefined();
    expect(validResponse.body.data.user.name).toBeDefined();

    const invalidResponse = await request(app)
      .post("/graphql")
      .send({ query: invalidQuery })
      .expect(200);

    expect(invalidResponse.body).toHaveProperty("errors");

    expect(invalidResponse.body.errors).toEqual([
      {
        "locations": [{ "column": 9, "line": 3 }],
        "message": 'Cannot query field "invalidQuery" on type "Query".',
      },
    ]);
  });
});
