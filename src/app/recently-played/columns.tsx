"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RecentlyPlayed } from "../types";

export const columns: ColumnDef<RecentlyPlayed>[] = [
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
  {
    accessorKey: "playedAt",
    header: "Played At",
  },
];
