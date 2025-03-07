import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserDropdown() {
  const { user } = useUser();
  return user ? (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="hover:cursor-pointer text-white ">
        <Image
          src={user.picture?.replace("_normal", "") || ""}
          alt={user.name || ""}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link
            href="/api/auth/logout?returnTo=/"
            className="btn btn-sm"
            onClick={(e) => {
              e.preventDefault();
              // Clear any local storage/cookies before logout
              localStorage.clear();
              sessionStorage.clear();
              document.cookie.split(";").forEach((c) => {
                document.cookie = c
                  .replace(/^ +/, "")
                  .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/"
                  );
              });
              // Redirect to logout with returnTo
              window.location.href = "/api/auth/logout?returnTo=/";
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
      href="/api/auth/login"
    >
      Login
    </Link>
  );
}
