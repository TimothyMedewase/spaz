"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

// Update the type to match the new API response
type FormattedTrack = {
  trackName: string;
  artistNames: string[];
  trackUrl: string;
  trackImg: string;
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
    accessorKey: "trackImg",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.trackUrl}
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            if (confirm(`Open "${row.original.trackName}" in a new tab?`)) {
              window.open(row.original.trackUrl, "_blank");
            }
          }}
          className="cursor-pointer"
        >
          <Image
            alt={row.original.trackName}
            src={row.original.trackImg}
            width={60}
            height={40}
          />
        </Link>
      );
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
