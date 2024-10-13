import React from "react";
import { Navbar } from "@/components/Navbar";
import Filter from "@/components/ui/tracksFilter";
import TracksPage from "@/components/tracks/TracksPage";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <Filter />
        <div className="mt-12">
          <TracksPage />
        </div>
      </div>
    </div>
  );
};

export default page;
