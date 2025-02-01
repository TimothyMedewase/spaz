"use client";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Filter } from "@/components/ui/filter";
import ArtistesData from "@/app/artistes/ArtistesData";
import Footer from "@/components/Footer";
import getTopArtistes from "../actions/get-top-artistes";

type TimePeriod = "4 weeks" | "6 months" | "12 months";
const ArtistesPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await getTopArtistes();
      //setData();
    };

    fetchData();
  }, [selectedPeriod]);

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <Filter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        <div className="mt-12 mb-5">
          <ArtistesData />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistesPage;
