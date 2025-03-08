import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";

import "./globals.css";
import React from "react";
import { Crown } from "lucide-react";
import { NavBar } from "@/components/navigation/NavBar";

import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="huevsite">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          name="keywords"
          content="Culture King, cultural knowledge, trivia, leaderboard, game"
        />
        <meta name="author" content="Your Name" />
        <link rel="icon" href="https://culture-king.vercel.app/favicon.ico" />
        <meta property="og:title" content="Culture King" />
        <meta
          property="og:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          property="og:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <meta property="og:url" content="https://culture-king.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Culture King" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Culture King Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Culture King - Daily Knowledge Competition"
        />
        <meta
          name="twitter:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          name="twitter:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <meta name="twitter:url" content="https://culture-king.vercel.app" />
        <title>Culture King</title>
      </head>
      <UserProvider>
        <body className={inter.className}>
          <ConfettiProvider>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
              {/* Hero Section */}
              <NavBar />

              <Toaster />
              <div className="mt-24">{children}</div>
              <footer className="bg-indigo-950 py-12">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                      <Crown className="h-8 w-8 text-yellow-400" />
                      <span className="text-2xl font-bold">Culture King</span>
                    </div>
                    <div className="flex gap-6">
                      <a
                        href="https://www.x.com/culturek1ng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200 hover:text-white"
                      >
                        Twitter
                      </a>

                      <a
                        href="https://www.producthunt.com/posts/culture-king"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200 hover:text-white"
                      >
                        Product Hunt
                      </a>
                    </div>
                  </div>
                  <div className="border-t border-purple-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-purple-300 mb-4 md:mb-0">
                      © {new Date().getFullYear()} Culture King. Built with 💜{" "}
                      <a
                        href="https://www.x.com/_huevsite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 hover:text-white"
                      >
                        @_huevsite
                      </a>
                    </p>
                    <div className="flex gap-6">
                      <a
                        href="#"
                        className="text-purple-300 hover:text-white text-sm"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="#"
                        className="text-purple-300 hover:text-white text-sm"
                      >
                        Terms of Service
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            <ToasterProvider />
          </ConfettiProvider>
        </body>
      </UserProvider>
    </html>
  );
}
