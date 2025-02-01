import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicypage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center text-3xl font-bold p-4">
          Privacy Policy
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicypage;
