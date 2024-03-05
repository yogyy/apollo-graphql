import { flexRender, Table as TableType } from "@tanstack/react-table";

interface TableProps<T> {
  tableData: TableType<T>;
  head?: boolean;
}
export const Table = <T extends unknown>({
  tableData,
  head = true,
}: TableProps<T>) => {
  return (
    <table className="w-full text-3.5 leading-4 text-left border-collapse">
      {head && (
        <thead className="uppercase text-3 font-bold text-text">
          {tableData.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-secondary/50 transition duration-300 hover:bg-secondary/5">
              {headerGroup.headers.map((header) => (
                <th
                  className="py-2.5 px-6 text-accent"
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
      <tbody className="text-text/80">
        {tableData.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className=":uno: border-b border-secondary/50 duration-300 odd:bg-secondary/10 hover:bg-secondary/50 odd:hover:bg-secondary/50">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className=":uno: py-2.5 px-6 text-start vertical-middle">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
