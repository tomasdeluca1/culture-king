"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Crown } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gradient-to-br from-purple-900 to-indigo-900 h-24 flex items-center justify-center fixed top-0 left-0 right-0 z-50 transition-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <header className="container mx-auto ">
        <div className="flex justify-between items-center">
          <Link href="/" className="btn btn-ghost flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">Culture King</span>
          </Link>

          <div className="hidden md:flex gap-2 items-center">
            <Link
              href="/#how-to-play"
              className="btn btn-ghost btn-sm hover:text-yellow-400 transition-colors"
            >
              How to Play
            </Link>
            <Link
              href="/#leaderboards"
              className="btn btn-ghost btn-sm hover:text-yellow-400 transition-colors"
            >
              Leaderboards
            </Link>
            <Link
              href="/#community"
              className="btn btn-ghost btn-sm hover:text-yellow-400 transition-colors"
            >
              Community
            </Link>

            {!pathname.includes("/daily") && (
              <a
                className="btn btn-ghost btn-sm bg-yellow-500 hover:bg-yellow-400 text-black"
                href={user ? "/daily" : "/api/auth/login?returnTo=/daily"}
              >
                Play Now
              </a>
            )}
            <UserDropdown />
          </div>
          <a
            className="md:hidden bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
            href={user ? "/daily" : "/api/auth/login?returnTo=/daily"}
          >
            Play
          </a>
        </div>
      </header>
    </nav>
  );
}
