"use client";

import { animate, stagger, utils } from "animejs";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

import { site } from "@/data/site";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import HeroVideo from "./HeroVideo";
import Spotlight from "./Spotlight";
import Magnetic from "./ui/Magnetic";

export default function Hero() {
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = copy.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      utils.set(items, { opacity: 1, y: 0 });
      return;
    }

    // One animation over the whole set instead of a variant tree: anime walks
    // the list itself and `stagger` computes each delay, so the cascade costs
    // a single tween list rather than one orchestrated child per line.
    const intro = animate(items, {
      opacity: [0, 1],
      y: [18, 0],
      duration: 700,
      delay: stagger(110, { start: 100 }),
      ease: EASE,
    });

    return () => {
      intro.revert();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Spotlight />
      <div className="container-px py-28">
        {/* Copy left, clip right. grid-cols-1 rather than relying on the
            implicit column: an implicit `auto` track sizes to max-content, and
            the clip's intrinsic width would push the hero past the viewport
            once the two stack on a phone. */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,50%)] lg:gap-12">
          {/* min-w-0: a grid item defaults to `min-width: auto`, so the wide
              `max-w-*` children below would otherwise stretch the column
              instead of wrapping inside it. */}
          <div ref={copy} className="min-w-0 max-w-3xl">
            <p
              data-hero-item
              className="section-index mb-5 flex items-center gap-2"
            >
              <span className="inline-block h-px w-8 bg-accent" />
              01 / hello
            </p>

            <h1
              data-hero-item
              className="font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Hi, I&apos;m{" "}
              <span className="accent-gradient-text italic">Prabharsha.</span>
            </h1>

            <p
              data-hero-item
              className="mt-5 font-mono text-base text-accent sm:text-lg"
            >
              {site.role}
            </p>

            <p
              data-hero-item
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              {site.taglines[0]} Currently engineering fintech products at
              PayMedia in Colombo, Sri Lanka.
            </p>

            <div
              data-hero-item
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
            </div>

            <div data-hero-item className="mt-8 flex items-center gap-4">
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
            </div>
          </div>

          <HeroVideo />
        </div>
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
