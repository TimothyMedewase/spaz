"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type recentlyPlayed = {
  img: string;
  track: string;
  artistes: string;
  playedAt: string;
};

export const columns: ColumnDef<recentlyPlayed>[] = [
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
