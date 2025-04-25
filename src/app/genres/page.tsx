"use client";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Filter } from "@/components/ui/filter";
import { Charts } from "@/components/genres/Charts";
import Footer from "@/components/Footer";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

const GenresPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");

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
        />
        <div className="mt-12 mb-5 ">
          <Charts selectedPeriod={selectedPeriod} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
