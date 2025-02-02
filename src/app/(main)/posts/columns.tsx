"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type SelectPost } from "~/types/posts";

export interface ColumnMeta {
  columnClasses: string;
}

export const columns: ColumnDef<SelectPost>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "author.name",
    header: "Author",
    meta: { columnClasses: "hidden md:table-cell" } as ColumnMeta,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="hidden text-right md:table-cell">Date</div>,
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
    meta: { columnClasses: "hidden text-right md:table-cell" } as ColumnMeta,
  },
];
