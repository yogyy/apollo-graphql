import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SearchMovie } from "./search-movie";
import { Table } from "./table";
import { MoviesLoading } from "./table-loading";

interface Movies {
  id: number;
  title: string;
  genre: [string];
  release_date: string;
  rating: number;
}

const ALL_MOVIES: TypedDocumentNode<{ movies: Movies[] }> = gql`
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

const columnHelper = createColumnHelper<Movies>();

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

export const MoviesData = () => {
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
        <div className="max-w-[731px] w-screen">
          {[...Array(11)].map((_, index) => (
            <MoviesLoading key={index} />
          ))}
        </div>
      )}
      {data && <Table tableData={table} />}
      <SearchMovie />
    </>
  );
};
