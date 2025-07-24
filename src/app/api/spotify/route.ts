import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get the OAuth access token for the user
    const provider = "oauth_spotify";

    try {
      const client = clerkClient;
      const clerkResponse = await client.users.getOauthAccessToken(
        userId,
        provider
      );

      const accessToken = clerkResponse[0]?.token || "";

      if (!accessToken) {
        console.error("No Spotify access token found for user");
        return NextResponse.json(
          {
            message:
              "Spotify access token not found. Have you connected your Spotify account?",
          },
          { status: 401 }
        );
      }

      // Store token in cookie with 1 hour expiry
      const cookieStore = await cookies();
      cookieStore.set("spotify_access_token", accessToken, {
        maxAge: 3600, // 1 hour in seconds
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return NextResponse.json({ accessToken });
    } catch (clerkError) {
      console.error("Error fetching OAuth token from Clerk:", clerkError);
      return NextResponse.json(
        { message: "Failed to retrieve Spotify token from auth provider" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in Spotify token API:", error);
    return NextResponse.json(
      { message: "Server error while processing authentication" },
      { status: 500 }
    );
  }
}
