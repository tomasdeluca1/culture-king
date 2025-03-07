"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Crown } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";

export function NavBar() {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <header className="container mx-auto px-4 pt-8 lg:pt-12">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="h-8 w-8 text-yellow-400" />
          <span className="text-2xl font-bold">Culture King</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/#how-to-play"
            className="hover:text-yellow-400 transition-colors"
          >
            How to Play
          </Link>
          <Link
            href="/#leaderboards"
            className="hover:text-yellow-400 transition-colors"
          >
            Leaderboards
          </Link>
          <Link
            href="/#community"
            className="hover:text-yellow-400 transition-colors"
          >
            Community
          </Link>

          {pathname.includes("/daily") ? (
            <UserDropdown />
          ) : (
            <Link
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
              href={user ? "/daily" : "/api/auth/login?returnTo=/daily"}
            >
              Play Now
            </Link>
          )}
        </div>
        <Link
          className="md:hidden bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
          href={user ? "/daily" : "/api/auth/login?returnTo=/daily"}
        >
          Play
        </Link>
      </div>
    </header>
  );
}
