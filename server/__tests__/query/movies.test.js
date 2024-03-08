import app from "../../api/index.js";
import request from "supertest";
import { describe, expect, test } from "vitest";

describe("POST /graphql movies", () => {
  test("should retrieve 415 Unsupported Media Type", async () => {
    const res = await request(app).post("/graphql");

    expect(res.status).toBe(415);
    expect(res.body).empty;
  });

  test("should retrieve movies data", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          query {
            movies {
              title
            }
          }
        `,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("movies");
    expect(res.body.data.movies).toBeInstanceOf(Array);
  });
});

describe("POST /graphql movie?title", () => {
  test("should return data", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          query GetMovie($title: String!) {
            movie(title: $title) {
              title
            }
          }
        `,
        variables: { "title": "sa" },
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("movie");
    expect(res.body.data).toEqual({
      movie: {
        title: "Mega Shark vs. Crocosaurus",
      },
    });
  });
});
