import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { TopTracksResponse } from "@/app/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Extract time_range and limit from URL query parameters
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("time_range") || "medium_term";
    const limit = url.searchParams.get("limit") || "50"; // Default to 50 if not specified

    // Validate time_range parameter
    if (!["short_term", "medium_term", "long_term"].includes(timeRange)) {
      return NextResponse.json(
        {
          message:
            "Invalid time_range parameter. Must be one of: short_term, medium_term, long_term",
        },
        { status: 400 }
      );
    }

    // Validate limit parameter
    const limitValue = parseInt(limit);
    if (isNaN(limitValue) || limitValue < 1 || limitValue > 50) {
      return NextResponse.json(
        {
          message:
            "Invalid limit parameter. Must be a number between 1 and 50.",
        },
        { status: 400 }
      );
    }

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
          headers: request.headers,
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
        return await fetchTracksData(
          tokenData.accessToken,
          timeRange,
          limitValue
        );
      } catch (tokenError) {
        console.error("Failed to get token from API:", tokenError);
        return NextResponse.json(
          { message: "Failed to retrieve Spotify access token" },
          { status: 401 }
        );
      }
    }

    // If we have a token, use it directly
    return await fetchTracksData(accessToken, timeRange, limitValue);
  } catch (error) {
    console.error("Unexpected error in tracks API:", error);
    return NextResponse.json(
      { message: "Server error while processing request" },
      { status: 500 }
    );
  }
}

async function fetchTracksData(
  accessToken: string,
  timeRange: string,
  limit: number
) {
  try {
    const timestamp = Date.now();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&timestamp=${timestamp}`,
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

    const data: TopTracksResponse = await response.json();
    // Use optional chaining for safer debugging
    console.log("Received track data with", data?.items?.length || 0, "items");

    const formattedData = data?.items
      ? data.items.map((item) => ({
          trackName: item.name || "Unknown Track Name",
          trackUrl: item.external_urls?.spotify || null,
          artistNames: item.artists?.map(
            (artist) => artist.name || "Unknown"
          ) || ["Unknown Artist"],
          trackImg: item.album?.images?.[0]?.url || null,
        }))
      : [];

    const formattedResponse = NextResponse.json(formattedData);

    formattedResponse.headers.set("Cache-Control", "no-store, max-age=0");

    return formattedResponse;
  } catch (error) {
    console.error("Error fetching tracks from Spotify:", error);
    return NextResponse.json(
      { message: "Failed to fetch tracks due to server error" },
      { status: 500 }
    );
  }
}
