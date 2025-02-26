"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/components/providers/ConfettiProvider";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  InfoIcon,
  Mail,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const ComponentSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <motion.div
    variants={fadeIn}
    className="mb-12 p-6 bg-base-100 rounded-xl shadow-lg border border-base-content/5"
  >
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-base-content/70 mb-6">{description}</p>
    <div className="p-4 bg-base-200/50 rounded-lg">{children}</div>
  </motion.div>
);

export default function ComponentsPage() {
  const { throwConfetti } = useConfetti();
  const [count, setCount] = useState(0);

  const showToast = (type: "success" | "error" | "info" | "custom") => {
    switch (type) {
      case "success":
        toast.success("Operation completed successfully!");
        break;
      case "error":
        toast.error("Something went wrong!");
        break;
      case "info":
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-base-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <InfoIcon className="h-10 w-10 text-primary" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-base-content">
                    Information
                  </p>
                  <p className="mt-1 text-sm text-base-content/70">
                    This is a custom toast notification!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
        break;
      case "custom":
        toast.custom(
          <div className="bg-primary text-primary-content px-6 py-4 rounded-lg shadow-lg">
            🎉 Custom Toast Style!
          </div>
        );
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl font-bold mb-8 text-center"
          >
            Components & Features
          </motion.h1>

          {/* Buttons Section */}
          <ComponentSection
            title="Buttons"
            description="Various button styles and variants available in the boilerplate."
          >
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <button className="btn btn-primary">DaisyUI Button</button>
              <button className="btn btn-secondary">DaisyUI Secondary</button>
            </div>
          </ComponentSection>

          {/* Toast Notifications */}
          <ComponentSection
            title="Toast Notifications"
            description="Pre-styled toast notifications for different use cases."
          >
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => showToast("success")}>
                Success Toast
              </Button>
              <Button variant="destructive" onClick={() => showToast("error")}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => showToast("info")}>
                Info Toast
              </Button>
              <Button variant="outline" onClick={() => showToast("custom")}>
                Custom Toast
              </Button>
            </div>
          </ComponentSection>

          {/* Confetti Effect */}
          <ComponentSection
            title="Confetti Effect"
            description="Add celebration effects to your UI interactions."
          >
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  throwConfetti();
                  toast.success("🎉 Congratulations!");
                }}
              >
                Trigger Confetti
              </Button>
            </div>
          </ComponentSection>

          {/* Alert Components */}
          <ComponentSection
            title="Alerts"
            description="Different types of alert components for various scenarios."
          >
            <div className="space-y-4">
              <div className="alert alert-info">
                <InfoIcon />
                <span>New software update available.</span>
              </div>
              <div className="alert alert-success">
                <CheckCircle2 />
                <span>Your payment has been confirmed!</span>
              </div>
              <div className="alert alert-warning">
                <AlertCircle />
                <span>Warning: Your storage is almost full</span>
              </div>
              <div className="alert alert-error">
                <XCircle />
                <span>Error! Task failed successfully.</span>
              </div>
            </div>
          </ComponentSection>

          {/* Cards */}
          <ComponentSection
            title="Cards"
            description="Various card layouts and styles."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Basic Card</h2>
                  <p>Simple card with title and content.</p>
                </div>
              </div>
              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title">Colored Card</h2>
                  <p>Card with primary color background.</p>
                </div>
              </div>
            </div>
          </ComponentSection>

          {/* Form Elements */}
          <ComponentSection
            title="Form Elements"
            description="Various form components and input styles."
          >
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Basic Input</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select</span>
                </label>
                <select className="select select-bordered w-full">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Toggle</span>
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
            </div>
          </ComponentSection>

          {/* State Management Demo */}
          <ComponentSection
            title="State Management"
            description="Example of state management with React hooks."
          >
            <div className="text-center space-y-4">
              <p className="text-4xl font-bold">{count}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setCount(count - 1)}>Decrease</Button>
                <Button onClick={() => setCount(count + 1)}>Increase</Button>
              </div>
            </div>
          </ComponentSection>

          {/* Email Integration */}
          <ComponentSection
            title="Email Integration"
            description="Ready-to-use email functionality with Resend."
          >
            <div className="flex items-center gap-4">
              <Button className="gap-2">
                <Mail className="w-4 h-4" />
                Send Test Email
              </Button>
              <p className="text-sm text-base-content/70">
                (Configure RESEND_API_KEY in .env)
              </p>
            </div>
          </ComponentSection>

          {/* Animation Examples */}
          <ComponentSection
            title="Animations"
            description="Built-in animations using Framer Motion."
          >
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-primary text-primary-content rounded-lg text-center cursor-pointer"
              >
                Hover & Tap Me!
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-12 h-12 bg-secondary rounded-lg mx-auto"
              />
            </div>
          </ComponentSection>
        </motion.div>
      </div>
    </div>
  );
}
