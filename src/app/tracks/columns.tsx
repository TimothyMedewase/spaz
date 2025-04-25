"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type TopTracks = {
  trackName: string;
  trackImg: string;
  artistNames: string[];
};

export const columns: ColumnDef<TopTracks>[] = [
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
      // Add 1 to the row index to start counting from 1 instead of 0
      return (
        <Image
          alt={row.original.trackName}
          src={row.original.trackImg}
          width={40}
          height={40}
        />
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
];
