import { Tracks, columns } from "@/components/tracks/columns";
import { DataTable } from "../data-table";
import { FaPlay } from "react-icons/fa";
async function getData(): Promise<Tracks[]> {
  // Fetch data from your API here.
  return [
    {
      rank: 1,
      img: "image url",
      track: "Track name",
      artistes: "Artistes",
    },
    // ...
  ];
}

export default async function TracksPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
