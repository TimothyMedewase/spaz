"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

type TopTracks = {
  trackName: string;
  trackImg: string; // This matches the field name from the API response
  artistNames: string[];
  externalUrl: string;
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
      const imgUrl = row.original.trackImg;
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

      // Add console.log to help debug image loading
      console.log("Track image URL:", imgUrl);

      return (
        <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
          <Image
            alt={row.original.trackName}
            src={imgUrl}
            width={60}
            height={40}
            className="hover:opacity-80 transition-opacity"
            unoptimized
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
];
