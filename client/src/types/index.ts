type Nationality =
  | "INDONESIA"
  | "JAPAN"
  | "MALAYSIA"
  | "PHILIPPINES"
  | "SINGAPORE";

interface User {
  id: number;
  name: string;
  username: string;
  age: number;
  nationality: Nationality;
}

interface Movie {
  id: number;
  title: string;
  genre: [string];
  release_date: string;
  rating: number;
}

export type { User, Movie };
