"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RocketIcon, BookOpen, Blocks, Github, LucideIcon } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

interface QuickStartCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const QuickStartCard = ({
  title,
  description,
  icon: Icon,
  href,
}: QuickStartCardProps) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-6 rounded-xl bg-base-100 shadow-lg border border-base-content/5 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-base-content/70">{description}</p>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial="initial" animate="animate" className="space-y-12">
          {/* Welcome Section */}
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Your New Project! 🎉
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              You've successfully set up the Huev Next.js Boilerplate. This page
              will help you get started with your development journey.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4">
            <QuickStartCard
              title="Quick Start Guide"
              description="Learn how to configure and start developing with this boilerplate"
              icon={RocketIcon}
              href="/docs"
            />
            <QuickStartCard
              title="Components & Features"
              description="Explore pre-built components and available features"
              icon={Blocks}
              href="/docs/components"
            />
            <QuickStartCard
              title="Documentation"
              description="Detailed documentation about all included features"
              icon={BookOpen}
              href="/docs"
            />
            <QuickStartCard
              title="GitHub Repository"
              description="View source code, report issues, and contribute"
              icon={Github}
              href="https://github.com/tomasdeluca1/huev-next-boiler"
            />
          </motion.div>

          {/* Next Steps */}
          <motion.div
            variants={fadeIn}
            className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-content/5"
          >
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  1
                </span>
                <span>
                  Update{" "}
                  <code className="text-sm bg-base-200 px-1 py-0.5 rounded">
                    .env
                  </code>{" "}
                  with your environment variables
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  2
                </span>
                <span>Configure MongoDB connection</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  3
                </span>
                <span>Set up Auth0 (optional)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  4
                </span>
                <span>Start building your awesome project!</span>
              </li>
            </ul>
          </motion.div>

          {/* Marketing Site Link */}
          <motion.div
            variants={fadeIn}
            className="text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-3">
              Want to learn more about this boilerplate?
            </h2>
            <p className="text-base-content/70 mb-4">
              Check out our landing page for features, documentation, and more.
            </p>
            <Link href="/landing">
              <Button
                size="lg"
                className="rounded-full shadow-lg shadow-primary/20"
              >
                View Landing Page
                <RocketIcon className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={fadeIn}
            className="text-center text-sm text-base-content/60"
          >
            <p>
              Made with 🥚 by the huev team. Need help?{" "}
              <Link
                href="https://github.com/yourusername/huev/issues"
                className="text-primary hover:underline"
              >
                Open an issue
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
