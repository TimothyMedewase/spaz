"use client";

import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RollingLoader } from "@/components/ui/rolling-loader";

const timeRangeMap = {
  "4 weeks": "short_term",
  "6 months": "medium_term",
  "12 months": "long_term",
};

// Diverse color palette
const COLORS = [
  "#1DB954", // Spotify green
  "#FF5733", // Coral
  "#4A90E2", // Blue
  "#9B59B6", // Purple
  "#F1C40F", // Yellow
  "#E74C3C", // Red
  "#3498DB", // Light blue
  "#2ECC71", // Emerald
  "#E67E22", // Orange
  "#8E44AD", // Violet
  "#16A085", // Teal
  "#D35400", // Pumpkin
  "#27AE60", // Nephritis
  "#2980B9", // Belize Hole
  "#F39C12", // Sunflower
  "#C0392B", // Pomegranate
  "#7D3C98", // Dark Purple
  "#2C3E50", // Dark Blue
  "#1ABC9C", // Turquoise
  "#F7DC6F", // Light Yellow
];

interface GenreData {
  genre: string;
  count: number;
  fill?: string;
}

interface ChartsProps {
  selectedPeriod: string;
  onDataUpdate?: (data: GenreData[]) => void;
}

// Create chart config matching the example style
const chartConfig: ChartConfig = {
  count: {
    label: "Count",
  },
} as const;

export function Charts({ selectedPeriod, onDataUpdate }: ChartsProps) {
  const [genreData, setGenreData] = useState<GenreData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();

  const fetchGenres = useCallback(
    async (retry = false) => {
      try {
        if (!retry) {
          setLoading(true);
        }
        setError(null);

        // Get the corresponding Spotify time range value
        const timeRange =
          timeRangeMap[selectedPeriod as keyof typeof timeRangeMap];

        console.log(`Fetching genres with time range: ${timeRange}`);

        const response = await fetch(`/api/genres?time_range=${timeRange}`, {
          cache: "no-store",
          headers: {
            "x-cache-bust": Date.now().toString(),
          },
        });

        if (!response.ok) {
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

        const data = await response.json();
        console.log("Received genres data:", data);

        // Add fill property to each genre data item
        const processedData = data.map((item: GenreData, index: number) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }));

        setGenreData(processedData);
        setLoading(false);

        // Notify parent component about data update
        if (onDataUpdate) {
          onDataUpdate(processedData);
        }
      } catch (err: unknown) {
        console.error("Error fetching genres:", err);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    },
    [selectedPeriod, router, onDataUpdate]
  );

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // Format the genre name for display
  const formatGenre = (genre: string) => {
    return genre
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card className="mb-8">
      <CardContent>
        {loading ? (
          <RollingLoader />
        ) : error ? (
          <div className="p-6 border border-red-300 rounded bg-red-50 text-red-800">
            <h2 className="text-xl font-semibold mb-2">Error loading genres</h2>
            <p>{error}</p>
            {error.includes("502") && (
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  onClick={() => {
                    setIsRetrying(true);
                    fetchGenres(true).finally(() => setIsRetrying(false));
                  }}
                  disabled={isRetrying}
                >
                  {isRetrying ? "Retrying..." : "Retry Now"}
                </button>
                <p className="mt-2 text-sm">
                  This error happens occasionally with Spotify&apos;s servers.
                  Try switching to &quot;6 months&quot; or &quot;12 months&quot;
                  if the issue persists.
                </p>
              </div>
            )}
          </div>
        ) : genreData.length === 0 ? (
          <div className="flex items-center justify-center h-72">
            <p className="text-lg text-muted-foreground">
              No genre data available for this time period
            </p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={genreData}
              layout="vertical"
              barSize={20}
              barCategoryGap="20%"
            >
              <YAxis
                dataKey="genre"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tick={{ fontSize: 14 }}
                width={100}
                tickFormatter={formatGenre}
              />
              <XAxis dataKey="count" type="number" hide />

              <Bar
                barSize={30}
                dataKey="count"
                name="Count"
                layout="vertical"
                radius={15}
              >
                {genreData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill || COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing your top genres for the last {selectedPeriod}
        </div>
      </CardFooter>
    </Card>
  );
}
