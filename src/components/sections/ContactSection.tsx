"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactSectionProps {
  title: string;
  subtitle?: string;
  contactInfo: ContactInfo;
  onSubmit?: (data: FormData) => Promise<void>;
}

export function ContactSection({
  title,
  subtitle,
  contactInfo,
  onSubmit,
}: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData: FormData = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        message: (form.elements.namedItem("message") as HTMLInputElement).value,
      };
      if (onSubmit) {
        await onSubmit(formData);
      }
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-base-content/70"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-base-200/50 p-6 rounded-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="message">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea textarea-bordered w-full h-32"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-base-content/70">{contactInfo.address}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
