"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavItem {
  name: string;
  link: string;
  icon?: React.JSX.Element;
}

export const NavbarUI = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative border-b">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="py-4 text-3xl font-extrabold text-[#1ED760]">
          SPAZ
        </Link>
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navItems.map((navItem: NavItem, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={clsx(
                "relative font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200",
                {
                  "text-neutral-950 dark:text-neutral-50":
                    pathname === navItem.link,
                }
              )}
            >
              <span className="text-md">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-[#1ED760] hover:text-[#1DB954] dark:text-[#1ED760] dark:hover:text-[#1DB954] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium bg-[#1ED760] text-white rounded-md hover:bg-[#1DB954] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral-600 dark:text-neutral-300 focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b z-50">
          <div className="flex flex-col items-center space-y-4 p-4">
            {navItems.map((navItem: NavItem, idx: number) => (
              <Link
                key={`mobile-link=${idx}`}
                href={navItem.link}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200",
                  {
                    "text-neutral-950 dark:text-neutral-50":
                      pathname === navItem.link,
                  }
                )}
              >
                {navItem.name}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <ModeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <SignedOut>
              <div className="flex flex-col items-center gap-4 w-full">
                <Link
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-[#1ED760] hover:text-[#1DB954] dark:text-[#1ED760] dark:hover:text-[#1DB954] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium bg-[#1ED760] text-white rounded-md hover:bg-[#1DB954] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </div>
  );
};
