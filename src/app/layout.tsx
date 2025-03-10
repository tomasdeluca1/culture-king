import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";
import { NavBar } from "@/components/navigation/NavBar";
import { Toaster } from "react-hot-toast";
import { Crown } from "lucide-react";
import { RouteLogger } from "@/components/analytics/RouteLogger";
import "./globals.css";
import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="huevsite" className="min-h-screen">
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
        <meta
          property="og:title"
          content="Culture King - The Ultimate Cultural Knowledge Challenge"
        />
        <meta
          property="og:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta property="og:url" content="https://culture-king.vercel.app" />
        <meta
          property="og:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Culture King - The Ultimate Cultural Knowledge Challenge"
        />
        <meta
          name="twitter:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          name="twitter:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <link rel="icon" href="https://culture-king.vercel.app/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="https://culture-king.vercel.app/apple-image.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://culture-king.vercel.app/apple-image.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://culture-king.vercel.app/apple-image.png"
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="fe566b1f-97e6-47cd-8b4f-aa95eb5c5dbf"
          strategy="afterInteractive"
        />
      </head>
      <UserProvider>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <Suspense fallback={null}>
            <RouteLogger />
          </Suspense>
          <ConfettiProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
              <NavBar />
              <main className="flex-grow mt-16">
                <Suspense fallback={null}>{children}</Suspense>
              </main>
              <footer className="bg-indigo-950/80 backdrop-blur-sm py-12 mt-auto">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                      <Crown className="h-8 w-8 text-yellow-400" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
                        Culture King
                      </span>
                    </div>
                    <div className="flex gap-6">
                      <Link
                        href="https://www.x.com/culturek1ng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200 hover:text-white transition-colors"
                      >
                        Twitter
                      </Link>
                      <Link
                        href="https://www.producthunt.com/posts/culture-king"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-200 hover:text-white transition-colors"
                      >
                        Product Hunt
                      </Link>
                    </div>
                  </div>
                  <div className="border-t border-purple-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-purple-300 mb-4 md:mb-0">
                      © {new Date().getFullYear()} Culture King. Built with 💜{" "}
                      <Link
                        href="https://www.x.com/_huevsite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 hover:text-white transition-colors"
                      >
                        @_huevsite
                      </Link>
                    </p>
                    <div className="flex gap-6">
                      <Link
                        href="/privacy"
                        className="text-purple-300 hover:text-white text-sm transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="/terms"
                        className="text-purple-300 hover:text-white text-sm transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </ConfettiProvider>
        </body>
      </UserProvider>
    </html>
  );
}
