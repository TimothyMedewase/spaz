// app/actions.ts
"use server";

import { cookies } from "next/headers";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function storeSpotifyToken() {
  const { userId } = await auth();

  if (!userId) return { success: false };

  try {
    const client = await clerkClient();
    const provider = "oauth_spotify";
    const tokenData = await client.users.getUserOauthAccessToken(
      userId,
      provider
    );
    const accessToken =
      tokenData?.data && tokenData.data.length > 0
        ? tokenData.data[0]?.token || ""
        : "";

    if (accessToken) {
      (await cookies()).set({
        name: "spotify_access_token",
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600, // 1 hour
      });

      return { success: true };
    }

    return { success: false, error: "No access token found" };
  } catch (error) {
    console.error("Error storing Spotify token:", error);
    return { success: false, error: String(error) };
  }
}
