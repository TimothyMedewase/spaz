// app/hooks/useSignOut.ts
"use client";

import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/actions/SignOutAction";

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    router.refresh(); // Refresh the current route
  };

  return handleSignOut;
}
