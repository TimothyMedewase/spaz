"use client";
import React from "react";
import { NavbarUI } from "./ui/navbar-ui";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Tracks",
      link: "/tracks",
    },
    {
      name: "Artistes",
      link: "/artistes",
    },
    {
      name: "Genres",
      link: "/genres",
    },
    {
      name: "Recents",
      link: "/recents",
    },
  ];
  return (
    <div className="relative  w-full">
      <NavbarUI navItems={navItems} />
    </div>
  );
}
