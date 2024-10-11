import React from "react";

import Link from "next/link";

import { Button } from "./ui/button";
import { signIn } from "@/auth";

export const NavbarLogin = () => {
  return (
    <div>
      <div className=" relative flex items-center justify-between ">
        <Link
          href="/"
          className=" mx-8 py-4 text-3xl font-extrabold text-[#1ED760]"
        >
          SPAZ
        </Link>
        <form
          action={async () => {
            "use server";
            await signIn("spotify", { redirectTo: "/" });
          }}
        >
          <Button className=" mx-8 justify-end py-6 rounded-full bg-[#1ED760] font-bold text-white uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200">
            Login to Spotify
          </Button>
        </form>
      </div>
    </div>
  );
};
