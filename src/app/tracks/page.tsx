"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Filter } from "@/components/ui/filter";
import Footer from "@/components/Footer";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import getTopTracks from "../actions/get-top-tracks";

type TimePeriod = "4 weeks" | "6 months" | "12 months";

const TracksPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("4 weeks");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await getTopTracks();
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
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TracksPage;
