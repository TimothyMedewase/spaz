"use server";
// Creating a hybrid approach - this works both server-side and client-side

export async function getAccessToken(): Promise<string | null> {
  try {
    // For client-side usage, we'll use localStorage
    // For server-side usage, we'll fetch from API

    // If called from server, fetch from API
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://your-production-url.com" // Replace with your production URL
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/spotify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch access token:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.accessToken) {
      console.error("No access token received");
      return null;
    }

    return data.accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}
