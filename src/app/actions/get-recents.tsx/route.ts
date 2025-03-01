import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  // Get the OAuth access token for the user
  const provider = "oauth_spotify";

  const client = await clerkClient();

  const clerkResponse = await client.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = clerkResponse.data[0]?.token || "";

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token not found" },
      { status: 401 }
    );
  }
  const spotifyUrl = "https://api.spotify.com/v1/me";

  const spotifyResponse = await fetch(spotifyUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // Handle the response from the Notion API
  const spotifyData = await spotifyResponse.json();
  console.log(spotifyData);

  return NextResponse.json({ message: spotifyData });
}
