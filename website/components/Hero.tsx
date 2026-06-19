"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import Spotlight from "./Spotlight";
import Magnetic from "./ui/Magnetic";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Spotlight />
      <div className="container-px py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="section-index mb-5 flex items-center gap-2"
          >
            <span className="inline-block h-px w-8 bg-accent" />
            01 / hello
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="accent-gradient-text">Prabharsha.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-mono text-lg text-accent sm:text-xl"
          >
            {site.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {site.taglines[0]} Currently engineering fintech products at
            PayMedia in Colombo, Sri Lanka.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-ink-contrast transition-transform hover:scale-[1.03]"
              >
                View my work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-accent"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={site.socials.email}
              aria-label="Email"
              className="text-muted transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown className="h-5 w-5 animate-float" />
      </a>
    </section>
  );
}
