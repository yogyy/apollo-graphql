import { useQuery, gql } from "@apollo/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "./table";

const ALL_USERS = gql`
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

const columnHelper = createColumnHelper();

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

  return (
    <div>
      <Table
        columns={columns}
        data={loading ? [] : data?.users}
      />
    </div>
  );
};
