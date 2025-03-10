import { RecentsResponse } from "../types";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getRecentTracks(): Promise<RecentsResponse> {
  const response = await fetch(`http://${NEXT_PUBLIC_BASE_URL}/recents`, {
    method: "GET",
  });
  //console.log(response);
  const data = await response.json();
  console.log(data);
  return data.items;
}
export default getRecentTracks;
