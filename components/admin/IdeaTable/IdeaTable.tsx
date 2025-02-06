"use client";
import { CompleteIdea } from "@/supabase/utils/utilTypes";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { defaultColumns } from "./IdeaColumns";
import { DataTableViewOptions } from "@/components/ui/data-table/column-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface IdeaTableProps {
  ideas: CompleteIdea[];
}

export const IdeaTable = ({ ideas }: IdeaTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: ideas,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      <DataTableViewOptions table={table} />
      <Input
        placeholder="Filter ideas..."
        value={(table.getColumn("idea")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("idea")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
