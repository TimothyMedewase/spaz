"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Filter } from "@/components/ui/filter";
import Footer from "@/components/Footer";
import ImageGrid from "../../components/artistes/ImageGrid";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

interface ArtistData {
  name: string;
  artistImgUrl: string;
}

const ArtistesPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");
  const [artists, setArtists] = useState<ArtistData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Map the UI time periods to Spotify's API time ranges
        const timeRangeMap = {
          "4 weeks": "short_term",
          "6 months": "medium_term",
          "12 months": "long_term",
        };

        const timeRange = timeRangeMap[selectedPeriod];
        // Use the new consolidated API endpoint with query parameter
        const response = await fetch(`/api/artistes?time_range=${timeRange}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setArtists(data);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
        setError("Failed to load artists data. Please try again later.");
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  // Transform the API response data to match the ImageGrid component's expected format
  const formattedImages = artists.map((artist) => ({
    artisteUrl: artist.artistImgUrl,
    artisteName: artist.name,
  }));

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className="flex justify-center text-3xl font-bold p-4">
          Top Artistes ({selectedPeriod})
        </h1>
        <Filter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        <div className="container mx-auto py-10">
          {loading ? (
            <div className="text-center py-10">Loading artists...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : artists.length === 0 ? (
            <div className="text-center py-10">
              No artists found for this time period.
            </div>
          ) : (
            <div className="flex py-8 mb-8 mx-auto">
              <ImageGrid images={formattedImages} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistesPage;
