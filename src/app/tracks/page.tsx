"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Filter } from "@/components/ui/filter";
import Footer from "@/components/Footer";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

// Map UI time periods to Spotify API time ranges
const timeRangeMap = {
  "4 weeks": "short_term",
  "6 months": "medium_term",
  "12 months": "long_term",
};

const TracksPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();

  const fetchTopTracks = useCallback(
    async (retry = false) => {
      try {
        if (!retry) {
          setLoading(true);
        }
        setError(null);

        // Get the corresponding Spotify time range value
        const timeRange = timeRangeMap[selectedPeriod];

        console.log(`Fetching top tracks with time range: ${timeRange}`);

        // Fetch tracks data from the API with the time range parameter
        const response = await fetch(`/api/tracks?time_range=${timeRange}`, {
          cache: "no-store",
          headers: {
            "x-cache-bust": Date.now().toString(),
          },
        });

        console.log("API response status:", response.status);

        if (!response.ok) {
          // If unauthorized, handle accordingly
          if (response.status === 401) {
            console.log("Unauthorized, redirecting to sign-in");
            router.push("/sign-in");
            return;
          }

          // Handle other errors
          let errorDetails = "Unknown error";
          let errorData;

          try {
            errorData = await response.json();
            errorDetails = JSON.stringify(errorData);
            console.error("Error response:", errorData);
          } catch (parseErr) {
            console.error("Could not parse error response:", parseErr);
          }

          // Special handling for 502 errors
          if (response.status === 502) {
            throw new Error(
              `Spotify server issue (502): ${
                errorData?.message || "Error while loading resource"
              }. This is a temporary issue with Spotify's servers.`
            );
          }

          throw new Error(
            `API request failed with status ${response.status}: ${errorDetails}`
          );
        }

        // Process the response
        const tracks = await response.json();
        console.log(
          "Received tracks data:",
          tracks
            ? Array.isArray(tracks)
              ? "Array with " + tracks.length + " items"
              : typeof tracks
            : "No data"
        );

        if (tracks && tracks.length > 0) {
          console.log(
            "First track example:",
            JSON.stringify(tracks[0], null, 2)
          );
        }

        setData(tracks);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching top tracks:", err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    },
    [selectedPeriod, router]
  );

  useEffect(() => {
    fetchTopTracks();
  }, [fetchTopTracks]);

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className="flex justify-center text-3xl font-bold p-4">
          Top Tracks ({selectedPeriod})
        </h1>
        <Filter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        <div className="container mx-auto py-10">
          {loading ? (
            <div className="text-center py-10">Loading top tracks...</div>
          ) : error ? (
            <div className="p-6 border border-red-300 rounded bg-red-50 text-red-800">
              <h2 className="text-xl font-semibold mb-2">
                Error loading tracks
              </h2>
              <p>{error}</p>
              {error.includes("502") && (
                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => {
                      setIsRetrying(true);
                      fetchTopTracks(true).finally(() => setIsRetrying(false));
                    }}
                    disabled={isRetrying}
                  >
                    {isRetrying ? "Retrying..." : "Retry Now"}
                  </button>
                  <p className="mt-2 text-sm">
                    This error happens occasionally with Spotify&apos;s servers.
                    Try switching to &quot;6 months&quot; or &quot;12
                    months&quot; if the issue persists.
                  </p>
                </div>
              )}
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-10">
              No top tracks found. Try playing more music on Spotify!
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TracksPage;
