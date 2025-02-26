"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Zap, Shield, Rocket, Code, Cloud, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function ExamplesPage() {
  const handleContactSubmit = async (formData: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", Object.fromEntries(formData.entries()));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Build Faster with Huev"
        subtitle="A modern, feature-rich foundation for your next web project. Built with cutting-edge technologies for exceptional developer experience."
        ctaText="Get Started"
        secondaryCtaText="Learn More"
        onCtaClick={() => toast.success("Primary CTA clicked!")}
        onSecondaryCtaClick={() => toast.success("Secondary CTA clicked!")}
        imageSrc="https://huev.site/_next/image?url=https%3A%2F%2Fs3.us-east-2.amazonaws.com%2Fhuev.site.s3%2FindexContext%2F1730495828026-hero-background-1730495828025.jpg&w=3840&q=75"
      />

      {/* Features Section */}
      <FeaturesSection
        title="Why Choose Huev"
        subtitle="Everything you need to build modern web applications"
        features={[
          {
            icon: Zap,
            title: "Lightning Fast",
            description:
              "Built on Next.js 15 with Turbopack for blazing fast performance.",
          },
          {
            icon: Shield,
            title: "Secure by Default",
            description:
              "Integrated Auth0 authentication and best security practices.",
          },
          {
            icon: Code,
            title: "Developer First",
            description:
              "TypeScript support, ESLint configuration, and proper folder structure.",
          },
          {
            icon: Cloud,
            title: "Modern Stack",
            description:
              "MongoDB, Tailwind CSS, DaisyUI, and other modern technologies.",
          },
          {
            icon: Rocket,
            title: "Quick Launch",
            description:
              "Pre-built components and features to launch your project faster.",
          },
          {
            icon: Lock,
            title: "Type Safe",
            description:
              "Full TypeScript support with proper types and interfaces.",
          },
        ]}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        title="What Developers Say"
        subtitle="Don't just take our word for it - hear from the developers who use Huev"
        testimonials={[
          {
            id: "1",
            content:
              "This boilerplate saved me weeks of setup time. The integration between Next.js, TypeScript, and MongoDB is seamless.",
            author: {
              name: "Sarah Chen",
              role: "Senior Developer",
              company: "TechCorp",
              image: "https://i.pravatar.cc/150?u=sarah",
            },
          },
          {
            id: "2",
            content:
              "The authentication setup with Auth0 is brilliant. Everything just works out of the box!",
            author: {
              name: "Mike Johnson",
              role: "Full Stack Developer",
              company: "DevStudio",
              image: "https://i.pravatar.cc/150?u=mike",
            },
          },
          {
            id: "3",
            content:
              "Clean code, great documentation, and excellent developer experience. This is how boilerplates should be.",
            author: {
              name: "Emily Rodriguez",
              role: "Tech Lead",
              company: "StartupX",
              image: "https://i.pravatar.cc/150?u=emily",
            },
          },
        ]}
      />

      {/* Contact Section */}
      <ContactSection
        title="Get in Touch"
        subtitle="Have questions? We'd love to hear from you."
        contactInfo={{
          email: "contact@huev.dev",
          phone: "+1 (555) 123-4567",
          address: "123 Developer Street, Tech Valley, CA 94025",
        }}
        onSubmit={(data: any) => handleContactSubmit(data)}
      />
    </div>
  );
}
