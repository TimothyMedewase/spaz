import { Navbar } from "@/components/Navbar";
import React from "react";
import Filter from "@/components/ui/tracksFilter";
import ArtistesPage from "@/components/artistes/ArtistesPage";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <Filter />
        <div className="mt-12"></div>
        <ArtistesPage />
      </div>
      <Footer />
    </div>
  );
};

export default page;
