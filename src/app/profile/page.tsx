import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center text-3xl font-bold p-4">
          Profile page
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
