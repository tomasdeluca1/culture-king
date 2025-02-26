"use client";

import { motion } from "framer-motion";
import {
  SiTypescript,
  SiTailwindcss,
  SiDaisyui,
  SiMongodb,
  SiFramer,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { TbBrandNextjs as Nextjs } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card bg-base-100/80 backdrop-blur-lg shadow-lg hover:shadow-xl border border-base-content/10 transition-all duration-300"
    >
      <div className="card-body p-4 sm:p-6 md:p-8">
        <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-base-content">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
function CodeBlock({ children }: { children: string[] }) {
  const [projectName, setProjectName] = useState("my-app");

  const getModifiedCommands = (name: string) => {
    return children.map((line) => line.replace("my-app", name));
  };

  return (
    <div className="bg-base-300/90 rounded-xl p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner border border-base-content/5 relative group">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Project name input */}
        <div className="flex items-center gap-2 mb-2">
          <label className="text-xs sm:text-sm text-base-content/60">
            Project name:
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="input input-sm input-bordered bg-base-200/50 border-base-content/20 text-base-content/90 w-48 focus:outline-none focus:border-primary/50"
            placeholder="Enter project name"
          />
        </div>

        {/* Code header with language indicator and copy button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-base-content/60">
              Terminal
            </span>
          </div>
          <motion.button
            onClick={async () => {
              await navigator.clipboard.writeText(
                getModifiedCommands(projectName).join("\n")
              );
              const tooltip = document.getElementById("copy-tooltip");
              if (tooltip) {
                tooltip.setAttribute("data-tip", "Copied!");
                setTimeout(() => {
                  tooltip.setAttribute("data-tip", "Copy code");
                }, 2000);
              }
            }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-ghost btn-xs tooltip tooltip-left opacity-0 group-hover:opacity-100 transition-opacity"
            data-tip="Copy code"
            id="copy-tooltip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#666666"
              className="w-3 h-3 sm:w-4 sm:h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </motion.button>
        </div>

        {/* Code content */}
        <div className="flex flex-col gap-1.5 sm:gap-2 text-base-content/90">
          {getModifiedCommands(projectName).map((line, index) => (
            <code
              key={index}
              className="font-mono text-xs sm:text-sm break-all sm:break-normal"
            >
              {line}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          className="relative flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 gap-8 sm:gap-12"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-3xl -z-10" />

          {/* Content Section */}
          <div className="w-full md:w-3/5">
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="relative">
                <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-[#F4BD41] via-[#3B82F6] to-[#F97316] bg-clip-text text-transparent pr-2">
                    Huev
                  </span>
                  <span className="text-base-content">next boilerplate</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-base-content/80 leading-relaxed max-w-2xl">
                A modern, feature-rich foundation for your next web project.
                Built with cutting-edge technologies for exceptional developer
                experience and performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow rounded-full px-8 sm:px-12"
                  >
                    <span>Get Started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pulse"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto gap-2 border-2 hover:bg-base-200/50 backdrop-blur-sm transition-all duration-300 rounded-full px-8 sm:px-12"
                  >
                    <span>Documentation</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:rotate-6"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats/Features Section */}
          <motion.div
            className="w-full md:w-2/5"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { title: "100%", subtitle: "Type Safe", color: "primary" },
                { title: "15+", subtitle: "Components", color: "secondary" },
                { title: "RSC", subtitle: "Enabled", color: "accent" },
                { title: "0 KB", subtitle: "Runtime JS", color: "primary" },
              ].map(({ title, subtitle, color }) => (
                <motion.div
                  key={subtitle}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="bg-base-100/50 backdrop-blur p-6 rounded-2xl border border-base-content/5"
                >
                  <h3 className={`text-4xl font-bold text-${color} mb-2`}>
                    {title}
                  </h3>
                  <p className="text-base-content/70">{subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Start Section */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-16 sm:mb-24 bg-base-200/50 backdrop-blur-sm rounded-2xl p-6 sm:p-10 shadow-lg border border-base-content/5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-base-content">
            Quick Start
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-base-content/80">
              Get your project up and running with these simple commands:
            </p>
            <CodeBlock>
              {[
                "git clone https://github.com/tomasdeluca1/huev-next-boiler.git my-app",
                "cd my-app",
                "rm -rf .git",
                "git init",
                "git add .",
                "git commit -m 'Initial commit'",
                "npm install --legacy-peer-deps",
                "npm run dev",
              ]}
            </CodeBlock>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24"
        >
          <FeatureCard
            emoji="⚡️"
            title="Lightning Fast"
            description="Experience blazing-fast performance with Next.js 15, React Server Components, and optimized TypeScript."
          />
          <FeatureCard
            emoji="🎨"
            title="Beautiful UI"
            description="Create stunning, responsive interfaces with the power of Tailwind CSS and DaisyUI components."
          />
          <FeatureCard
            emoji="🛠"
            title="Developer Ready"
            description="Hit the ground running with pre-configured MongoDB, authentication, and comprehensive API utilities."
          />
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-16 sm:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-base-content/80">
            Powered By
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                name: "Next.js 15",
                version: "15.0.3",
                icon: <Nextjs className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
              },
              {
                name: "TypeScript",
                version: "^5",
                icon: (
                  <SiTypescript className="w-6 h-6 sm:w-8 sm:h-8 text-[#3178C6]" />
                ),
              },
              {
                name: "Tailwind CSS",
                version: "^3.4.1",
                icon: (
                  <SiTailwindcss className="w-6 h-6 sm:w-8 sm:h-8 text-[#06B6D4]" />
                ),
              },
              {
                name: "DaisyUI",
                version: "^4.12.14",
                icon: (
                  <SiDaisyui className="w-6 h-6 sm:w-8 sm:h-8 text-[#5A0EF8]" />
                ),
              },
              {
                name: "MongoDB",
                version: "^8.8.0",
                icon: (
                  <SiMongodb className="w-6 h-6 sm:w-8 sm:h-8 text-[#47A248]" />
                ),
              },
              {
                name: "React",
                version: "19.0.0-rc",
                icon: (
                  <FaReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB]" />
                ),
              },
              {
                name: "Auth0",
                version: "^3.5.0",
                icon: (
                  <MdSecurity className="w-6 h-6 sm:w-8 sm:h-8 text-[#EB5424]" />
                ),
              },
              {
                name: "Framer Motion",
                version: "^11.11.11",
                icon: <SiFramer className="w-6 h-6 sm:w-8 sm:h-8 text-black" />,
              },
              {
                name: "Resend",
                version: "^4.0.1-alpha.0",
                icon: (
                  <MdEmail className="w-6 h-6 sm:w-8 sm:h-8 text-[#000000]" />
                ),
              },
            ].map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{
                  scale: 1.05,
                  rotate: Math.random() * 10 - 5,
                }}
                className="flex flex-col gap-3 bg-base-100 p-4 sm:p-6 rounded-xl shadow-md border border-base-content/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{tech.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm sm:text-base text-base-content/90">
                      {tech.name}
                    </span>
                    <span className="text-xs text-base-content/60">
                      {tech.version}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center mb-16 sm:mb-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 sm:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-base-content/80 mb-6 sm:mb-8 max-w-2xl">
            Join the community and start building amazing applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/yourusername/huev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg px-6 sm:px-8 rounded-full w-full sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="mr-2"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Star on GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/docs"
              className="btn btn-outline btn-lg px-6 sm:px-8 rounded-full w-full sm:w-auto"
            >
              View Documentation
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="footer footer-center p-4 sm:p-8 text-base-content/80 border-t border-base-300"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm sm:text-base font-medium">
            <a
              href="/docs"
              className="hover:text-primary transition-colors duration-300"
            >
              Documentation
            </a>
            <a
              href="/examples"
              className="hover:text-primary transition-colors duration-300"
            >
              Examples
            </a>
            <a
              href="https://github.com/yourusername/huev"
              className="hover:text-primary transition-colors duration-300"
            >
              GitHub
            </a>
          </div>
          <div className="mt-4 text-sm sm:text-base font-medium">
            <p>Crafted with 🥚 by the huev team</p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
