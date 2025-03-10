"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Crown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/daily", label: "Daily Challenge" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/suggestions", label: "Suggestions" },
];

export function NavBar() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-indigo-950/80 backdrop-blur-lg border-b border-purple-800/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Crown className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
              Culture King
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  pathname === item.href ? "text-white" : "text-purple-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading &&
              (user ? (
                <div className="flex items-center gap-3">
                  <Link href="/api/auth/logout">
                    <Button
                      variant="ghost"
                      className="text-purple-200 hover:text-white"
                    >
                      Logout
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 bg-purple-900/50 px-3 py-1.5 rounded-full">
                    <Image
                      src={user.picture || ""}
                      alt={user.name || ""}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <span className="text-sm font-medium text-purple-100">
                      {user.name}
                    </span>
                  </div>
                </div>
              ) : (
                <a href="/api/auth/login">
                  <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
                    Sign In
                  </Button>
                </a>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-purple-200 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-indigo-950/95 backdrop-blur-lg border-t border-purple-800/50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-purple-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {!isLoading &&
                  (user ? (
                    <div className="border-t border-purple-800/50 pt-4 mt-2">
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={user.picture || ""}
                          alt={user.name || ""}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-purple-100">
                          {user.name}
                        </span>
                      </div>
                      <a
                        href="/api/auth/logout"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-medium text-purple-200 hover:text-white"
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    <a
                      href="/api/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-block"
                    >
                      <Button className="bg-yellow-500 hover:bg-yellow-400 text-black w-full">
                        Sign In
                      </Button>
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
