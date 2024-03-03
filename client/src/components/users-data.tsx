import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "./table";
import { UsersLoading } from "./table-loading";

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

const ALL_USERS: TypedDocumentNode<{ users: User[] }> = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

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

export const UsersData = () => {
  const { data, loading } = useQuery(ALL_USERS);
  const table = useReactTable({
    data: data ? data.users : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {loading && (
        <div className="max-w-[731px] w-screen">
          {[...Array(21)].map((_, index) => (
            <UsersLoading key={index} />
          ))}
        </div>
      )}
      <Table tableData={table} />
    </>
  );
};
