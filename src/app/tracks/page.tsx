import React from "react";
import { Navbar } from "@/components/Navbar";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-12 mx-12">
        <span className=" flex justify-center border-2 text-3xl font-bold">
          Tracks page
        </span>
        <div className="mt-7">filter according to time</div>
        <div className="mt-12">table</div>
      </div>
    </div>
  );
};

export default page;
