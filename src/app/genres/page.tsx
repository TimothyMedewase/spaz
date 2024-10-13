import { Navbar } from "@/components/Navbar";
import React from "react";
import Filter from "@/components/ui/tracksFilter";
import { Charts } from "@/components/genres/Charts";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <div>
          <Filter />
        </div>
        <div>
          <Charts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
