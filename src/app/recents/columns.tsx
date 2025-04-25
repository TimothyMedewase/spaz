"use client";

import { ColumnDef } from "@tanstack/react-table";

// Update the type to match the new API response
type FormattedTrack = {
  trackName: string;
  artistNames: string[];
  playedAt: string;
};

export const columns: ColumnDef<FormattedTrack>[] = [
  {
    id: "rank", // Custom ID for the rank column
    header: "Rank",
    cell: ({ row }) => {
      // Add 1 to the row index to start counting from 1 instead of 0
      return <div className="font-medium text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "trackName",
    header: "Track",
  },
  {
    accessorKey: "artistNames",
    header: "Artists",
    cell: ({ row }) => {
      // Join artist names with commas
      return row.original.artistNames.join(", ");
    },
  },
  {
    accessorKey: "playedAt",
    header: "Played At",
    cell: ({ row }) => {
      // Format the timestamp to be more readable
      const date = new Date(row.original.playedAt);
      return date.toLocaleString();
    },
  },
];
