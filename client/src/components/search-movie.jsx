import React from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "./table";
import { Skeleton } from "./atom/skeleton";

const GET_MOVIE_BY_TITLE = gql`
  query getMovie($title: String!) {
    movie(title: $title) {
      title
      genre
      release_date
      rating
    }
  }
`;
const columnHelper = createColumnHelper();

const columns = [
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

export const SearchMovie = () => {
  const [title, setTitle] = React.useState("");
  const [fetchingMovie, { data, loading, error }] =
    useLazyQuery(GET_MOVIE_BY_TITLE);
  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="py-5rem flex flex-col gap-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedTitle = title.trim();
          if (trimmedTitle.length !== 0) {
            fetchingMovie({ variables: { title: trimmedTitle } });
          }
        }}>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="title"
            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text/50 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <button className="inline-flex hover:cursor-pointer bg-secondary text-background shadow hover:bg-secondary/75 active:bg-secondary/50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 disabled:pointer-events-none disabled:opacity-50">
            Search
          </button>
        </div>
      </form>
      <div className="space-y-2">
        {data && data?.movie === null && <p>Movie not found</p>}
        {loading && (
          <div className="flex gap-2 border-y border-secondary/50 py-1">
            <Skeleton className="h-7 w-8%" />
            <Skeleton className="h-7 w-32%" />
            <Skeleton className="h-7 w-28%" />
            <Skeleton className="h-7 w-20%" />
            <Skeleton className="h-7 w-12%" />
          </div>
        )}
        {error && <p>error fetching movie</p>}
        {data && data?.movie !== null && (
          <Table
            columns={columns}
            data={[data?.movie]}
            head={false}
          />
        )}
      </div>
    </div>
  );
};
