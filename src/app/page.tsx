import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import WobbleCardDemo from "../components/wobble-cards";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-5 mx-12">
        <div className="flex justify-center text-3xl font-bold p-4">
          <WobbleCardDemo />
        </div>
      </div>
      <Footer />
    </div>
  );
}
