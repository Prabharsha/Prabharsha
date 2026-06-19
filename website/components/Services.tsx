"use client";

import { motion } from "framer-motion";
import { Layers, Server, Landmark, Rocket, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<Service["key"], LucideIcon> = {
  fullstack: Layers,
  backend: Server,
  fintech: Landmark,
  saas: Rocket,
};

export default function Services() {
  return (
    <section id="services" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        index="03"
        title="What I do"
        subtitle="How I can help — across the stack, with a fintech edge."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = icons[service.key];
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass glass-hover group relative overflow-hidden rounded-2xl p-6"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
