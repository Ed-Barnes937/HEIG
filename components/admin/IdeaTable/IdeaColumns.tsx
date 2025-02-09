import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { IdeaWithEquipment } from "@/utils/supabase/queries/idea";

const columnHelper = createColumnHelper<IdeaWithEquipment[0]>();

const defaultColumns = [
  columnHelper.accessor("idea", {
    cell: ({ getValue }) => getValue(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Idea" />
    ),
  }),
  columnHelper.accessor("type", {
    cell: ({ getValue }) => getValue(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  }),
  columnHelper.accessor("theme", {
    cell: ({ getValue }) => getValue(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Theme" />
    ),
  }),
  columnHelper.accessor("tags", {
    cell: ({ row }) =>
      row.original.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("age_range", {
    cell: ({ getValue }) => getValue(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  }),
  columnHelper.accessor("equipment", {
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.original.equipment?.map((item) => (
          <Badge key={item.id}>{item.name}</Badge>
        ))}
      </div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipment" />
    ),
    enableSorting: false,
  }),
];

export { defaultColumns };
