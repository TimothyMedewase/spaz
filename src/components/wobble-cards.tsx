"use client";
import { WobbleCard } from "@/components/ui/wobble-card";
import Link from "next/link";
import Image from "next/image";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <Link href="/artistes" className="block w-full col-span-1 lg:col-span-3">
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] cursor-pointer">
          <div className="max-w-sm  relative z-10">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              View your Top Artistes
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Get a list of your most listened to artistes over the last 4
              weeks, 6 months, or 12 months of spotify listening.
            </p>
          </div>
        </WobbleCard>
      </Link>

      <Link href="/genres" className="block col-span-1 lg:col-span-2">
        <WobbleCard
          containerClassName="h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] cursor-pointer"
          className=""
        >
          <div className="max-w-sm -mt-10 relative z-10">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              View your Top Genres
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Get a breakdown of your top ten genres over the last 4 weeks, 6
              months, or 12 months of spotify listening.
            </p>
          </div>
        </WobbleCard>
      </Link>

      <Link href="/tracks" className="block col-span-1">
        <WobbleCard containerClassName="col-span-1 min-h-[300px] cursor-pointer">
          <div className=" max-w-sm -mt-10 relative z-10">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              View your Top Tracks
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Get a list of your most listened to artistes over the last 4
              weeks, 6 months, or 12 months of spotify listening.
            </p>
          </div>
        </WobbleCard>
      </Link>

      <Link href="/recents" className="block w-full col-span-1 lg:col-span-3">
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] cursor-pointer">
          <div className="max-w-sm relative z-10">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              View your Recently Played tracks
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Get a list of the recent tracks you played on spotify, with the
              ability to play them again.
            </p>
          </div>
        </WobbleCard>
      </Link>
    </div>
  );
}
