"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserButton, useClerk } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";

export const NavbarUI = ({
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
  // Add state to track if component is mounted (client-side only)
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();

  // Custom sign out handler that clears cookies before signing out
  const handleSignOut = async () => {
    // Delete the Spotify token cookie
    document.cookie =
      "spotify_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=Lax";

    // Then sign out with Clerk
    await signOut();
  };

  // Use effect to set mounted to true when component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the actual UI after component is mounted on client
  // This prevents hydration mismatches
  if (!mounted) {
    return (
      <div className="border-b relative flex items-center justify-between">
        <Link
          href="/"
          className="mx-8 py-4 text-3xl font-extrabold text-[#1ED760]"
        >
          SPAZ
        </Link>
        <div className="flex justify-end space-x-4 mr-4">
          <div className="w-6 h-6"></div>
          <div className="w-10 h-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b relative flex items-center justify-between">
        <Link
          href="/"
          className="mx-8 py-4 text-3xl font-extrabold text-[#1ED760]"
        >
          SPAZ
        </Link>
        <div
          className={cn(
            "flex max-w-full relative mx-auto pr-8 pl-8 py-4 items-center justify-center space-x-8",
            className
          )}
        >
          {navItems.map((navItem, idx: number) => (
            <Link
              key={`link-${idx}`}
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
        <div className="mr-4">
          <ModeToggle />
        </div>
        <div className="mr-2 size-auto flex">
          <UserButton afterSignOutUrl="/" signOutCallback={handleSignOut} />
        </div>
      </div>
    </div>
  );
};
