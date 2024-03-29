import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/types";
import { useQuery } from "@apollo/client";
import { Table } from "@/components/atom/table";
import { ALL_USERS } from "@/lib/graphql/queries";
import { UsersLoading } from "@/components/table-loading";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "Name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("username", {
    header: () => "Username",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => <span>Age</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("nationality", {
    header: "Nationality",
    footer: (info) => info.column.id,
  }),
];

export default function UsersPage() {
  const { data, loading, error } = useQuery(ALL_USERS);
  const table = useReactTable({
    data: data ? data.users : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {error && <p>error fetching data</p>}
      {loading && (
        <div className="max-w-[731px] w-screen">
          {[...Array(21)].map((_, index) => (
            <UsersLoading key={index} />
          ))}
        </div>
      )}
      {data && <Table tableData={table} />}
    </>
  );
}
