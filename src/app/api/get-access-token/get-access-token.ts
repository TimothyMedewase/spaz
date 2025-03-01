"use server";

import { cookies } from "next/headers";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

// Types for tokens
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

// Function to refresh the access token
export async function refreshAccessToken(
  refresh_token: string
): Promise<TokenResponse | null> {
  try {
    const basic = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    // Update cookies with new tokens
    const cookieStore = await cookies();

    // Set access token with expiry
    cookieStore.set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in,
    });

    // If a new refresh token is provided, update it as well
    if (data.refresh_token) {
      cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Set a long expiry for refresh token (e.g., 1 year)
        maxAge: 365 * 24 * 60 * 60,
      });
    }

    return data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

// Function to get the current access token, refreshing if necessary
export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;

  if (!accessToken && refreshToken) {
    // No access token but we have a refresh token - try to refresh
    const newTokens = await refreshAccessToken(refreshToken);
    return newTokens?.access_token ?? null;
  }

  return accessToken ?? null;
}

// Wrapper for Spotify API calls that handles token refresh
export async function spotifyFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If we get a 401, try refreshing the token and retry the request
  if (response.status === 401) {
    const refreshToken = (await cookies()).get("spotify_refresh_token")?.value;

    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);

      if (newTokens?.access_token) {
        // Retry the request with the new access token
        return fetch(`https://api.spotify.com/v1${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newTokens.access_token}`,
          },
        });
      }
    }
  }

  return response;
}
