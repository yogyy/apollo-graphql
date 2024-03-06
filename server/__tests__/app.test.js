import app from "../api/index.js";
import request from "supertest";

describe("cannot GET / route", () => {
  test("GET /", async () => {
    const res = await request(app).get("/");
    expect(res.notFound);
  });
});

describe("GET /graphql route", () => {
  test("GET /graphql error, because not provide query string", async () => {
    // const res = await request(app).post("/graphql").send({}); // same with bellow
    const res = await request(app).get("/graphql");
    // .query(
    //   "query=query+getAllMovies+%7B%0A++movies+%7B%0A++++id%0A++++title%0A++%7D%0A%7D"
    // );

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({
      errors: [{ message: "Must provide query string." }],
    });
  });
});

describe("POST /graphql users", () => {
  test("should retrieve 415 Unsupported Media Type", async () => {
    const res = await request(app).post("/graphql");

    expect(res.status).toBe(415);
    expect(res.body).toEqual({});
  });

  test("should retrieve user data", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: /* GraphQL */ `
          query {
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
  test("should retrieve user data and handle errors", async () => {
    const validQuery = `
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

    const invalidQuery = `
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

    expect(invalidResponse.body).toHaveProperty("error");

    expect(invalidResponse.body.errors).toEqual([
      {
        "locations": [{ "column": 9, "line": 3 }],
        "message": 'Cannot query field "invalidQuery" on type "Query".',
      },
    ]);
  });
});
