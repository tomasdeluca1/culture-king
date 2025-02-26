import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";
import { authConfig } from "@/lib/config/auth";
import "./globals.css";
import React from "react";
import { NavBar } from "@/components/navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Wrapper = authConfig.isEnabled ? UserProvider : React.Fragment;

  return (
    <html lang="en" data-theme="huevsite">
      <body className={inter.className}>
        <Wrapper>
          <ConfettiProvider>
            <NavBar />
            <main className="pt-16">{children}</main>
            <ToasterProvider />
          </ConfettiProvider>
        </Wrapper>
      </body>
    </html>
  );
}
