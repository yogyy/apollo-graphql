import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// eslint-disable-next-line react/prop-types
export const Table = ({ data, columns, head = true }) => {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full text-3.5 leading-4 text-left border-collapse text-text/75">
      {head && (
        <thead className="uppercase text-3 font-bold text-text">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-secondary/50 transition duration-300 hover:bg-secondary/5">
              {headerGroup.headers.map((header) => (
                <th
                  className="py-2.5 px-6 text-start vertical-middle"
                  key={header.id}>
                  {header.isPlaceholder
                    ? "null"
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="border-b border-secondary/50 transition-colors duration-200 odd:bg-secondary/10 hover:bg-secondary/50 odd:hover:bg-secondary/50">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="py-2.5 px-6 text-start vertical-middle">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
