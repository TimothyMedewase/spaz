"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Recents } from "../types";

export const columns: ColumnDef<Recents>[] = [
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
