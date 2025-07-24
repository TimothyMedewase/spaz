import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const response = NextResponse.redirect(new URL("/", requestUrl.origin));
    response.cookies.delete("spotify_access_token");
    return response;
  } catch (error) {
    console.error("Error during sign out:", error);
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(new URL("/", requestUrl.origin));
  }
}
