import React from "react";
import { Navbar } from "@/components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center  text-3xl font-bold p-4">
          Recently played page
        </h1>
        <div>filter according to time</div>
        <div>table</div>
      </div>
    </div>
  );
};

export default page;
