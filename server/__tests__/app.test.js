import { describe, expect, test } from "vitest";
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
