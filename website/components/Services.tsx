"use client";

import { Layers, Server, Landmark, Rocket, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

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
        subtitle="How I can help across the stack, with a fintech edge."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = icons[service.key];
          return (
            <Reveal key={service.key} variant="up" delay={i * 0.1} duration={0.6}>
              {/* The lift is a plain CSS transition: a one-shot hover onto a
                  static offset needs no animation engine, and keeping it off
                  the JS loop leaves the frame budget to the reveals. */}
              <div className="glass glass-hover group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1.5">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
