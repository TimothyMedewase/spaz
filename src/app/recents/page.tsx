"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { columns } from "./columns";
import Footer from "@/components/Footer";
import { DataTable } from "@/components/data-table";
import { useRouter } from "next/navigation";

// Polling interval in milliseconds (e.g., 30 seconds)
const POLLING_INTERVAL = 30000;

const Recents = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchTracks = async () => {
    try {
      console.log("Fetching tracks from formatted API...");

      // Updated to use the new formatted API endpoint
      const response = await fetch("/api/recents/formatted", {
        cache: "no-store",
        // Add a cache-busting query parameter
        headers: {
          "x-cache-bust": Date.now().toString(),
        },
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        // If unauthorized, redirect to login
        if (response.status === 401) {
          console.log("Unauthorized, redirecting to login");
          router.push("/login");
          return;
        }

        // Attempt to parse error response
        let errorDetails = "Unknown error";
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
          console.error("Error response:", errorData);
        } catch (parseErr) {
          console.error("Could not parse error response:", parseErr);
        }

        throw new Error(
          `API request failed with status ${response.status}: ${errorDetails}`
        );
      }

      const data = await response.json();
      console.log(
        "Received data structure:",
        data
          ? Array.isArray(data)
            ? "Array with " + data.length + " items"
            : typeof data
          : "No data"
      );

      if (data && data.length > 0) {
        console.log("First track example:", JSON.stringify(data[0], null, 2));
      }

      setTracks(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTracks();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchTracks, POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [router]);

  // Function to manually refresh data
  const handleRefresh = () => {
    setLoading(true);
    fetchTracks();
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mx-auto">Recents</h1>
        </div>
        <div className="container mx-auto py-10">
          {loading ? (
            <div className="text-center py-10">Loading recent tracks...</div>
          ) : error ? (
            <div className="p-6 border border-red-300 rounded bg-red-50 text-red-800">
              <h2 className="text-xl font-semibold mb-2">
                Error loading tracks
              </h2>
              <p>{error}</p>
            </div>
          ) : tracks.length === 0 ? (
            <div className="text-center py-10">
              No recent tracks found. Try playing something on Spotify first!
            </div>
          ) : (
            <DataTable columns={columns} data={tracks} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recents;
