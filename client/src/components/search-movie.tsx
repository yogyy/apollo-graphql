import React from "react";
import { useLazyQuery } from "@apollo/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "./atom/table";
import { MoviesLoading } from "./table-loading";
import { Movie } from "@/types";
import { GET_MOVIE_BY_TITLE } from "@/lib/graphql/queries";
import { SearchMovieForm } from "./search-movie-form";

const columnHelper = createColumnHelper<Omit<Movie, "id">>();

const columns = [
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("genre", {
    header: () => "Genre",
    cell: (info) => info.renderValue()!.toString().replace(/,/g, ", "),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("release_date", {
    header: () => "Release Date",
    cell: (info) => info.getValue(),
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

  const table = useReactTable({
    data: data ? [data.movie] : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-5rem flex flex-col gap-3">
      <SearchMovieForm
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedTitle = title.trim();
          if (trimmedTitle.length !== 0) {
            fetchingMovie({ variables: { title: trimmedTitle } });
          }
        }}
        onChange={(e) => setTitle(e.currentTarget.value)}
        disabled={title.length === 0 || loading}
      />
      <div className="space-y-2">
        {data && data?.movie === null && <p>Movie not found</p>}
        {loading && <MoviesLoading />}
        {error && <p>error fetching movie</p>}
        {data && data?.movie !== null && <Table tableData={table} />}
      </div>
    </div>
  );
};
