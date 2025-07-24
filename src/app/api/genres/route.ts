import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Extract time_range from URL query parameters
    const url = new URL(request.url);
    const timeRange = url.searchParams.get("time_range") || "medium_term";

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
        return await fetchGenresData(tokenData.accessToken, timeRange);
      } catch (tokenError) {
        console.error("Failed to get token from API:", tokenError);
        return NextResponse.json(
          { message: "Failed to retrieve Spotify access token" },
          { status: 401 }
        );
      }
    }

    // If we have a token, use it directly
    return await fetchGenresData(accessToken, timeRange);
  } catch (error) {
    console.error("Unexpected error in genres API:", error);
    return NextResponse.json(
      { message: "Server error while processing request" },
      { status: 500 }
    );
  }
}

async function fetchGenresData(accessToken: string, timeRange: string) {
  // Maximum number of retry attempts for 502 errors
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const timestamp = Date.now();
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50&timestamp=${timestamp}`,
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

        // For 502 errors specifically, retry if we haven't hit the max retries yet
        if (response.status === 502 && attempt < maxRetries - 1) {
          console.log(
            `Received 502 error for timeRange ${timeRange}, retry attempt ${
              attempt + 1
            }/${maxRetries}`
          );

          // Wait longer between each retry (exponential backoff)
          const delayMs = 1000 * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          continue;
        }

        return NextResponse.json(
          { message: "Error fetching data from Spotify", details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();

      // Process genres from artists data
      // Extract all genres from the artists
      const allGenres: string[] = [];
      data.items?.forEach((artist: string) => {
        if (artist.genres && Array.isArray(artist.genres)) {
          artist.genres.forEach((genre) => {
            allGenres.push(genre);
          });
        }
      });

      // Count genre occurrences
      const genreCounts: Record<string, number> = {};
      allGenres.forEach((genre) => {
        if (genreCounts[genre]) {
          genreCounts[genre]++;
        } else {
          genreCounts[genre] = 1;
        }
      });

      // Convert to array and sort by count (descending)
      const sortedGenres = Object.entries(genreCounts)
        .map(([genre, count]) => ({ genre, count }))
        .sort((a, b) => b.count - a.count);

      // Limit to top 20 genres for visualization purposes
      const topGenres = sortedGenres.slice(0, 15);

      const formattedResponse = NextResponse.json(topGenres);
      formattedResponse.headers.set("Cache-Control", "no-store, max-age=0");
      return formattedResponse;
    } catch (error) {
      // If we still have retries left for unexpected errors, try again
      if (attempt < maxRetries - 1) {
        console.log(
          `Unexpected error fetching genres, retry attempt ${
            attempt + 1
          }/${maxRetries}`
        );
        const delayMs = 1000 * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      console.error(
        "Error fetching genres from Spotify after all retries:",
        error
      );
      return NextResponse.json(
        { message: "Failed to fetch genres due to server error" },
        { status: 500 }
      );
    }
  }
}
