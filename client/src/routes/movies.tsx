import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Movie } from "@/types";
import { useQuery } from "@apollo/client";
import { Table } from "@/components/atom/table";
import { ALL_MOVIES } from "@/lib/graphql/queries";
import { SearchMovie } from "@/components/search-movie";
import { MoviesLoading } from "@/components/table-loading";

const columnHelper = createColumnHelper<Movie>();

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
    cell: (info) => info.renderValue()?.toString().replace(/,/g, ", "),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("release_date", {
    header: () => "Release Date",
    cell: (info) => {
      const date = new Date(info.getValue().toString())
        .toUTCString()
        .match(/^[A-Za-z]+, (\d+ \w+ \d{4})/)![1];
      return date;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("rating", {
    header: () => "Rating",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export default function MoviesPage() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  const table = useReactTable({
    data: data ? data.movies : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {error && <p>error fetching data</p>}
      {loading && (
        <div
          className="max-w-[731px] w-screen"
          data-testid="movies-skeleton">
          {[...Array(11)].map((_, index) => (
            <MoviesLoading key={index} />
          ))}
        </div>
      )}
      {data && <Table tableData={table} />}
      <SearchMovie />
    </>
  );
}
