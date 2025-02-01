"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TopTracks } from "../types";

export const columns: ColumnDef<TopTracks>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "img",
    header: "",
  },
  {
    accessorKey: "track",
    header: "Track",
  },
  {
    accessorKey: "artistes",
    header: "Artistes",
  },
];
