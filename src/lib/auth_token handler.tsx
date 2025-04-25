"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function AuthTokenHandler() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    async function handleAuthStateChange() {
      if (!isLoaded) return;

      if (isSignedIn) {
        // User is signed in - fetch and store token
        try {
          const response = await fetch("/api/spotify", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log("Spotify token setup completed on auth state change");
          }
        } catch (error) {
          console.error("Error setting up token:", error);
        }
      } else {
        // User is signed out - clear the token
        try {
          const response = await fetch("/api/spotify/revoke", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log("Spotify token removed on sign out");
          }
        } catch (error) {
          console.error("Error removing token on sign out:", error);
        }
      }
    }

    handleAuthStateChange();
  }, [isSignedIn, isLoaded]);

  // This is an invisible component
  return null;
}
