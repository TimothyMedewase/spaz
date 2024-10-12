import { Navbar } from "@/components/Navbar";
import React from "react";
import TopTracksFilter from "@/components/ui/tracksFilter";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <TopTracksFilter />
        <div className="mt-12">table</div>
        <div>table</div>
      </div>
    </div>
  );
};

export default page;
