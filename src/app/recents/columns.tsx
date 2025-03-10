"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RecentsResponse } from "../types";

export const columns: ColumnDef<RecentsResponse>[] = [
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
