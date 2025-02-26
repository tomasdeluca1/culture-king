"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  imageSrc?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
  imageSrc = "/placeholder-hero.png",
}: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />

      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-base-content/70 mb-8 max-w-lg mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onCtaClick}
                className="rounded-full shadow-lg shadow-primary/20"
              >
                {ctaText}
              </Button>
              {secondaryCtaText && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onSecondaryCtaClick}
                  className="rounded-full"
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px]"
          >
            <Image
              src={imageSrc}
              alt="Hero"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
