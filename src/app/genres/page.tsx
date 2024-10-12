import { Navbar } from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <span className=" flex justify-center border-2 text-3xl font-bold">
          Genres page
        </span>
        <div>filter according to time</div>
        <div>table</div>
      </div>
    </div>
  );
};

export default page;
