import React from "react";
import { Navbar } from "@/components/Navbar";
import { columns } from "./columns";
import Footer from "@/components/Footer";
import { DataTable } from "@/components/data-table";
import { Suspense } from "react";
import getRecentTracks from "@/app/actions/get-recent-tracks";

const Recents = async () => {
  const tracks = await getRecentTracks();

  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center text-3xl font-bold p-4">Recents</h1>
        <div>
          <div className="container mx-auto py-10">
            <Suspense fallback={<div>Loading...</div>}>
              <DataTable columns={columns} data={tracks} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recents;
