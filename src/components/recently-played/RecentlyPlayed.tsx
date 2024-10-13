import { recentlyPlayed, columns } from "@/components/recently-played/columns";
import { DataTable } from "@/components/data-table";

async function getData(): Promise<recentlyPlayed[]> {
  // Fetch data from your API here.
  return [
    {
      img: "image url",
      track: "Track name",
      artistes: "Artistes",
      playedAt: "Date",
    },
    // ...
  ];
}

export default async function RecentlyPlayed() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
