import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";
import { NavBar } from "@/components/navigation/NavBar";
import { Toaster } from "react-hot-toast";
import { Crown } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Culture King - The Ultimate Cultural Knowledge Challenge",
  description:
    "Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!",
  keywords: "Culture King, cultural knowledge, trivia, leaderboard, game",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Culture King - The Ultimate Cultural Knowledge Challenge",
    description:
      "Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!",
    url: "https://culture-king.vercel.app",
    siteName: "Culture King",
    images: [
      {
        url: "https://culture-king.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Culture King Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Culture King - The Ultimate Cultural Knowledge Challenge",
    description:
      "Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!",
    images: ["https://culture-king.vercel.app/og-image.png"],
  },
  icons: {
    icon: "https://culture-king.vercel.app/favicon.ico",
    apple: "https://culture-king.vercel.app/apple-image.png",
    shortcut: "https://culture-king.vercel.app/apple-image.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "https://culture-king.vercel.app/apple-image.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "https://culture-king.vercel.app/apple-image.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="huevsite">
      <UserProvider>
        <body className={inter.className}>
          <ConfettiProvider>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
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
          </ConfettiProvider>
        </body>
      </UserProvider>
    </html>
  );
}
