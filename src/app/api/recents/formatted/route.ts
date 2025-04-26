import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RecentsResponse } from "../../../types";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // First check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get token from cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("spotify_access_token")?.value;

    // If no token in cookie, redirect user to get a new one
    if (!accessToken) {
      console.log("Token not found in cookie, redirecting to token endpoint");

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://your-production-url.com"
          : "http://localhost:3000");

      try {
        const tokenResponse = await fetch(`${baseUrl}/api/spotify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!tokenResponse.ok) {
          throw new Error(`Failed to fetch token: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();

        if (!tokenData.accessToken) {
          return NextResponse.json(
            {
              message:
                "No Spotify access token available. Please connect your Spotify account.",
            },
            { status: 401 }
          );
        }

        // Use the newly fetched token for the next request
        return await fetchFormattedRecentTracks(tokenData.accessToken);
      } catch (tokenError) {
        console.error("Failed to get token from API:", tokenError);
        return NextResponse.json(
          { message: "Failed to retrieve Spotify access token" },
          { status: 401 }
        );
      }
    }

    // If we have a token, use it directly
    return await fetchFormattedRecentTracks(accessToken);
  } catch (error) {
    console.error("Unexpected error in recents API:", error);
    return NextResponse.json(
      { message: "Server error while processing request" },
      { status: 500 }
    );
  }
}

async function fetchFormattedRecentTracks(accessToken: string) {
  try {
    const timestamp = Date.now();
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50&timestamp=${timestamp}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Token appears to be expired or invalid");

        return NextResponse.json(
          { message: "Authentication expired, please refresh the page" },
          { status: 401 }
        );
      }

      const errorData = await response
        .json()
        .catch(() => ({ message: "Failed to parse Spotify error response" }));

      console.error("Spotify API Error:", response.status, errorData);

      return NextResponse.json(
        { message: "Error fetching data from Spotify", details: errorData },
        { status: response.status }
      );
    }

    const data: RecentsResponse = await response.json();

    const formattedData = data?.items
      ? data.items.map((item) => ({
          trackName: item.track?.name || "Unknown Track",
          artistNames: item.track?.artists?.map(
            (artist) => artist.name || "Unknown"
          ) || ["Unknown Artist"],
          trackUrl: item.track?.external_urls?.spotify || "Unknown URL",
          trackImg: item.track?.album?.images?.[0]?.url || "Unknown Image",
          playedAt: item.played_at || "Unknown Date",
        }))
      : [];

    const formattedResponse = NextResponse.json(formattedData);

    formattedResponse.headers.set("Cache-Control", "no-store, max-age=0");

    return formattedResponse;
  } catch (error) {
    console.error("Error fetching recent tracks from Spotify:", error);
    return NextResponse.json(
      { message: "Failed to fetch recent tracks due to server error" },
      { status: 500 }
    );
  }
}
