"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReactElement } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tracks = {
  rank: number;
  img: string;
  track: string;
  artistes: string;
};

export const columns: ColumnDef<Tracks>[] = [
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
