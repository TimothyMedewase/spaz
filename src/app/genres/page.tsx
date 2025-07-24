"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useCallback } from "react";
import { Filter } from "@/components/ui/filter";
import { Charts } from "@/components/genres/Charts";
import Footer from "@/components/Footer";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

interface GenreData {
  [key: string]: any;
  genre: string;
  count: number;
  fill?: string;
}

const GenresPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");
  const [genreData, setGenreData] = useState<GenreData[]>([]);

  const handleDataUpdate = useCallback((data: GenreData[]) => {
    setGenreData(data);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center text-3xl font-bold p-4">
          Top Genres ({selectedPeriod})
        </h1>
        <Filter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          shareData={genreData}
          shareType="genres"
        />
        <div className="mt-12 mb-5 ">
          <Charts
            selectedPeriod={selectedPeriod}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
