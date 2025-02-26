"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-base-200/50">
      <div className="container mx-auto px-4">
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
              className="text-lg text-base-content/70 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.author.name}</h3>
                  <p className="text-sm text-base-content/70">
                    {testimonial.author.role} at {testimonial.author.company}
                  </p>
                </div>
              </div>
              <blockquote className="text-base-content/80 italic">
                "{testimonial.content}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
