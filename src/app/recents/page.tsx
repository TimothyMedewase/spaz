import React from "react";
import { Navbar } from "@/components/Navbar";
import { columns } from "./columns";
import Footer from "@/components/Footer";
import { DataTable } from "@/components/data-table";

const Recents = async () => {
  const data = await getRecents();
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <h1 className=" flex justify-center text-3xl font-bold p-4">Recents</h1>
        <div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recents;
