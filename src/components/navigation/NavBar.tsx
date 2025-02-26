"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export function NavBar() {
  const pathname = usePathname();
  const { isConfigured, user, login, logout } = useAuth();

  const isLandingPage = pathname === "/landing";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar bg-base-100/50 backdrop-blur-lg fixed top-0 z-50 border-b border-base-content/5"
    >
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          🥚 Huev
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {isLandingPage ? (
            <>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/get-started">Get Started</Link>
              </li>
              <li>
                <Link href="/examples">Examples</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/landing">Landing Page</Link>
              </li>
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/examples">Examples</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {isConfigured && (
          <button
            onClick={user ? logout : login}
            className="btn btn-primary btn-sm"
          >
            {user ? "Logout" : "Login"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
