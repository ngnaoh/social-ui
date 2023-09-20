"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ExitIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ToggleTheme } from "./toggle-theme";
import { useCookies } from "react-cookie";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "userId",
  ]);
  function signOut() {
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    removeCookie("userId", { path: "/" });
    router.push("/");
  }
  return (
    <div className={cn("pb-12 h-screen flex flex-col", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Skipli Project
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/home" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push("/home", { scroll: false })}
            >
              <HomeIcon className="mr-2" />
              Home
            </Button>
            <Button
              variant={pathname === "/accounts" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => router.push("/accounts", { scroll: false })}
            >
              <GearIcon className="mr-2" />
              Accounts
            </Button>
            <Button
              onClick={signOut}
              variant="ghost"
              className="w-full justify-start"
            >
              <ExitIcon className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <div className="px-4">
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
