//import { TopTracks } from "@/app/types";
import { cookies } from "next/headers";
export async function GET() {
  const SPOTIFY_ACCESS_TOKEN = (await cookies()).get("spotify_access_token");
  console.log(SPOTIFY_ACCESS_TOKEN);
  const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
    },
  });
  console.log(response);
  return response.json();
}
