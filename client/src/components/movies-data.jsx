import { useQuery, gql } from "@apollo/client";
import { createColumnHelper } from "@tanstack/react-table";
import { SearchMovie } from "./search-movie";
import { Table } from "./table";

const ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      id
      title
      genre
      release_date
      rating
    }
  }
`;

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("genre", {
    header: () => "Genre",
    cell: (info) => info.renderValue().toString().replace(/,/g, ", "),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("release_date", {
    header: () => "Release Date",
    cell: (info) =>
      new Date(info.getValue())
        .toUTCString()
        .match(/^[A-Za-z]+, (\d+ \w+ \d{4})/)[1],
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("rating", {
    header: () => "Rating",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export const MoviesData = () => {
  const { data: movies, loading } = useQuery(ALL_MOVIES);

  return (
    <div>
      <Table
        columns={columns}
        data={loading ? [] : movies.movies}
      />
      <SearchMovie />
    </div>
  );
};
