"use client";

import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="container-px">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "bg-surface/80 shadow-xl shadow-black/30 backdrop-blur-xl"
              : ""
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 text-base font-bold tracking-tight"
            aria-label="Back to top"
          >
            <span className="h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
            {site.name}
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 font-mono text-sm transition-colors hover:text-accent ${
                  active === link.href ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-1.5 font-mono text-sm text-accent transition-colors hover:bg-accent/10 sm:flex"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              className="glass flex h-9 w-9 items-center justify-center rounded-full md:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open ? (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 font-mono text-sm text-muted transition-colors hover:bg-line/5 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 font-mono text-sm text-accent"
            >
              resume ↗
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
