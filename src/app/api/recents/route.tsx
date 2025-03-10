import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Get Spotify token directly from cookie
  const cookieStore = await cookies();
  //console.log(cookieStore);
  const accessToken = cookieStore.get("spotify_access_token");

  if (!accessToken) {
    return NextResponse.json(
      { message: "Spotify access token not found in cookies" },
      { status: 401 }
    );
  }
  try {
    // Fetch recently played tracks from Spotify API
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          // Accept: "application/json",
          scope: "user-read-recently-played",
        },
      }
    );

    if (!response.ok) {
      // Handle token expiration
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Spotify token expired" },
          { status: 401 }
        );
      }

      const error = await response.json();
      return NextResponse.json(
        { message: "Error fetching Spotify data", error },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recent tracks:", error);
    return NextResponse.json(
      { message: "Failed to fetch recent tracks" },
      { status: 500 }
    );
  }
}
