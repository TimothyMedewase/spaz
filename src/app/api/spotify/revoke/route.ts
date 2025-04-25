import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Delete the spotify access token cookie
    const cookieStore = await cookies();
    cookieStore.delete("spotify_access_token");

    return NextResponse.json({
      message: "Spotify token removed successfully",
    });
  } catch (error) {
    console.error("Error removing Spotify token:", error);
    return NextResponse.json(
      { message: "Failed to remove Spotify token" },
      { status: 500 }
    );
  }
}
