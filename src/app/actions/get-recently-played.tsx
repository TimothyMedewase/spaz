import { RecentlyPlayed } from "@/app/types";
const getRecentlyPlayed = async (): Promise<RecentlyPlayed[]> => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    }
  );

  return response.json();
};

export default getRecentlyPlayed;
