import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-12 mx-12">
        <span className=" flex justify-center border-2 text-3xl font-bold">
          Home page
        </span>
      </div>
    </div>
  );
}
