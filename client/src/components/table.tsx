import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
} from "@tanstack/react-table";
import {
  Table as TableAtom,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atom/table";

interface TableProps<T> {
  tableData: TableType<T>;
  head?: boolean;
}
export const Table = <T extends unknown>({
  tableData,
  head = true,
}: TableProps<T>) => {
  return (
    <TableAtom className="w-full text-3.5 leading-4 text-left border-collapse">
      {head && (
        <TableHeader className="uppercase text-3 font-bold text-text">
          {tableData.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-secondary/50 transition duration-300 hover:bg-secondary/5">
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="py-2.5 px-6"
                  key={header.id}>
                  {header.isPlaceholder
                    ? "null"
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody>
        {tableData.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="border-b border-secondary/50 duration-300 odd:bg-secondary/10 hover:bg-secondary/50 odd:hover:bg-secondary/50">
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="py-2.5 px-6 text-start vertical-middle">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableAtom>
  );
};
