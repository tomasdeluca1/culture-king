"use client";

import { motion } from "framer-motion";
import { useConfetti } from "@/components/providers/ConfettiProvider";
import { Check } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) => {
  const { throwConfetti } = useConfetti();

  const handlePurchase = () => {
    throwConfetti();
    toast.success("Thanks for your interest! We'll be in touch soon.");
  };

  return (
    <motion.div
      variants={fadeIn}
      className={`rounded-2xl p-6 ${
        highlighted
          ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
          : "bg-base-100 text-base-content"
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-sm">/project</span>}
      </div>
      <p className="mb-6 text-sm opacity-90">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handlePurchase}
        className={`w-full py-2 px-4 rounded-lg ${
          highlighted
            ? "bg-white text-primary hover:bg-primary-content"
            : "btn btn-primary"
        } transition-colors`}
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
              Start building your next project with our feature-rich
              boilerplate. Select the plan that best fits your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingTier
              name="Community"
              price="Free"
              description="Perfect for personal projects and learning"
              features={[
                "Full Boilerplate Access",
                "Basic Documentation",
                "Community Support",
                "GitHub Issues",
                "MIT License",
              ]}
            />
            <PricingTier
              name="Pro"
              price="$49"
              description="For professional developers and small teams"
              features={[
                "Everything in Community",
                "Premium Documentation",
                "Priority Support",
                "Private Slack Channel",
                "Custom Components",
                "1-on-1 Setup Call",
              ]}
              highlighted
            />
            <PricingTier
              name="Enterprise"
              price="$199"
              description="For large teams and complex projects"
              features={[
                "Everything in Pro",
                "Custom Integration",
                "Team Training",
                "Architecture Review",
                "Deployment Support",
                "SLA Support",
              ]}
            />
          </div>

          <motion.div variants={fadeIn} className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Not sure which plan to choose?
            </h2>
            <p className="mb-6 text-base-content/80">
              Contact us for a personalized demo and consultation
            </p>
            <Link
              href="mailto:contact@huev.dev"
              className="btn btn-outline btn-lg rounded-full"
            >
              Contact Sales
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-16 p-6 bg-base-100 rounded-2xl text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              100% Satisfaction Guaranteed
            </h2>
            <p className="text-base-content/70">
              {`Don't just take our word for it`}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
