"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Buttons } from "../Buttons";
import { Button } from "./button";
//import { ModeToggle } from "./toggle";

export const NavbarUI= ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const pathname = usePathname();
  return (
  <div>
     
    <div className=" border-b relative flex items-center justify-center">
    <Link 
      href="/" 
      className=" mx-8 py-4 text-3xl font-extrabold text-[#1ED760]">SPAZ</Link>
      <div
        className={cn(
          " flex max-w-full relative mx-auto pr-8 pl-8 py-4 items-center justify-center space-x-8 ",
          className
        )}
      >
      
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={clsx(
              "relative font-semibold items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200",
              {
                "text-neutral-950 dark:text-neutral-50":
                  pathname === navItem.link,
              }
            )}
          >
            <div className="group relative">
              <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 absolute rounded shadow-lg p-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 -mt-8 left-1/2 transform -translate-x-1/2">
                {navItem.name}
              </span>
            </div>
            <span className="hidden sm:block text-md">{navItem.name}</span>
          </Link>
        ))}
      </div>
      <div ><Button className="py-6 rounded-full bg-[#1ED760] font-bold text-white uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200">Login to Spotify</Button></div>
      
      <div className="mr-4 flex justify-end">
        {/* <ModeToggle /> */}
      </div>
    </div>
    </div>
  );
};