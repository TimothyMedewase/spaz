"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

// Update the type to match the new API response
type FormattedTrack = {
  trackName: string;
  artistNames: string[];
  playedAt: string;
  imageUrl: string; // Changed from imgUrl to imageUrl to match API response
  externalUrl: string;
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
    accessorKey: "imageUrl", // Changed from trackImg to imageUrl
    header: "",
    cell: ({ row }) => {
      const imgUrl = row.original.imageUrl; // Changed from imgUrl to imageUrl
      const externalUrl = row.original.externalUrl;

      // Check if imgUrl is empty string or undefined/null
      // If empty, use a placeholder or return a div instead
      if (!imgUrl) {
        return (
          <div
            className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-sm"
            aria-label="No image available"
          >
            <span className="text-xs text-gray-500">No img</span>
          </div>
        );
      }

      return (
        <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
          <Image
            alt={row.original.trackName}
            src={imgUrl}
            width={60}
            height={40}
            className="hover:opacity-80 transition-opacity"
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
    header: "Artistes",
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
