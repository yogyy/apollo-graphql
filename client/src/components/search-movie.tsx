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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedTitle = title.trim();
          if (trimmedTitle.length !== 0) {
            fetchingMovie({ variables: { title: trimmedTitle } });
          }
        }}
        className="flex gap-3">
        <input
          type="text"
          placeholder="title"
          className=":uno: flex h-9 w-full rounded-md border text-accent border-primary focus:ring focus:ring-accent focus:border-accent bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text/50 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <button
          type="submit"
          disabled={title.length === 0 || loading}
          className=":uno: inline-flex text-text hover:cursor-pointer bg-secondary focus-visible:ring-2 focus-visible:ring-accent text-background shadow hover:bg-secondary/50 focus-within:bg-secondary/75 active:bg-secondary/50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 disabled:pointer-events-none disabled:opacity-50">
          Search
        </button>
      </form>
      <div className="space-y-2">
        {data && data?.movie === null && <p>Movie not found</p>}
        {loading && <MoviesLoading />}
        {error && <p>error fetching movie</p>}
        {data && data?.movie !== null && <Table tableData={table} />}
      </div>
    </div>
  );
};
