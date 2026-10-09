"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, Menu, X, Copy, Check, Download, ShieldCheck, Layers, MousePointerClick } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { site, services } from "@/data/site";

import ExperienceList from "./ExperienceList";
import HeroV2 from "./HeroV2";
import StackOrbit from "./StackOrbit";
import ThemeToggle from "./ThemeToggle";
import WorkShowcase from "./WorkShowcase";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const strengths = [
  { Icon: ShieldCheck, title: "Dependable APIs", text: "Spring Boot services and REST APIs built for the correctness and security that payment systems demand." },
  { Icon: Layers, title: "Clean architecture", text: "Code that stays readable as products grow, so the next feature is as easy to ship as the first." },
  { Icon: MousePointerClick, title: "Effortless interfaces", text: "Next.js and React front ends that feel fast and simple, connected cleanly to the systems behind them." },
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const menuButton = useRef<HTMLButtonElement>(null);
  const page = useRef<HTMLDivElement>(null);

  // Section reveals and the services row drift, all on GSAP so they share the
  // same scroll clock as the pinned sections.
  useEffect(() => {
    const root = page.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      q<HTMLElement>("[data-reveal]").forEach((target) => {
        gsap.from(target, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: target, start: "top 85%" } });
      });
      q<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, { y: 36, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: group, start: "top 85%" } });
      });
    });
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(q(".service-track"), { xPercent: 6 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: q(".services-section")[0], start: "top bottom", end: "bottom top", scrub: 0.6 } });
    });
    // Contact card: the hero's cursor glow, plus a gentle counter-move of the content.
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const card = q<HTMLElement>(".contact-card")[0];
      const glow = q<HTMLElement>(".contact-glow")[0];
      if (!card || !glow) return;
      const gx = gsap.quickTo(glow, "x", { duration: 0.55, ease: "power3.out" });
      const gy = gsap.quickTo(glow, "y", { duration: 0.55, ease: "power3.out" });
      const layers = ([[".contact-top", 14], [".contact-bottom", 8]] as const).map(([sel, f]) => ({
        f,
        x: gsap.quickTo(q(sel)[0], "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(q(sel)[0], "y", { duration: 0.9, ease: "power3.out" }),
      }));
      gsap.set(glow, { x: card.offsetWidth * 0.3, y: card.offsetHeight * 0.8 });
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        gx(e.clientX - r.left);
        gy(e.clientY - r.top);
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        layers.forEach((l) => { l.x(nx * l.f); l.y(ny * l.f * 0.6); });
      };
      const enter = () => gsap.to(glow, { autoAlpha: 1, duration: 0.4 });
      const leave = () => {
        gsap.to(glow, { autoAlpha: 0, duration: 0.6 });
        layers.forEach((l) => { l.x(0); l.y(0); });
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      };
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); mm.revert(); };
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true); setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch { setCopyError(true); }
  }

  return <div className="portfolio" ref={page}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="header-inner wrap">
        <a href="#top" className="wordmark" aria-label="Prabharsha, back to top">prabharsha<span>.</span></a>
        <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <div className="header-actions">
          <ThemeToggle />
          <a href={site.resume} className="resume-link" target="_blank" rel="noopener noreferrer"><i aria-hidden="true" />Résumé</a>
        </div>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!menuOpen}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18} /></a>)}</nav>
    </header>

    <main id="main">
      <HeroV2 />
      <WorkShowcase />

      <section id="about" className="why-section wrap section-space" aria-labelledby="about-heading">
        <div className="why-head" data-reveal>
          <h2 id="about-heading">Why work <em>with me?</em></h2>
          <p className="eyebrow">Serious about the work. Human about the rest.</p>
        </div>
        <div className="why-grid" data-stagger>
          {strengths.map(({ Icon, title, text }) => <div key={title} className="why-item">
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>)}
        </div>
        <div className="why-bio" data-reveal>
          <p>{site.bio}</p>
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">A little more about me <ArrowUpRight size={18} /></a>
        </div>
      </section>

      <section id="services" className="services-section section-space" aria-labelledby="services-heading">
        <div className="wrap services-head" data-reveal>
          <h2 id="services-heading">From the first idea<br />to the <em>final detail.</em></h2>
          <p>I work across the stack, from server-side services with Java and Spring Boot to modern web front ends with Next.js and TypeScript. Here is where I can help.</p>
        </div>
        <div className="service-viewport">
          <ul className="service-track" data-stagger>
            {services.map((service, index) => <li key={service.key} className="service-card">
              <span className="service-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
              <span className="service-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </li>)}
          </ul>
        </div>
      </section>

      <section id="experience" className="exp-section wrap section-space" aria-labelledby="experience-heading">
        <div className="exp-head" data-reveal>
          <h2 id="experience-heading">Built on<br /><em>experience.</em></h2>
          <a className="text-link" href={site.resume} target="_blank" rel="noopener noreferrer">Read my résumé <Download size={17} /></a>
        </div>
        <ExperienceList />
      </section>

      <StackOrbit />

      <section id="contact" className="contact-section wrap" aria-labelledby="contact-heading">
        <div className="contact-card" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-top">
            <p className="contact-mark" aria-hidden="true">prabharsha<span>.</span></p>
            <div className="contact-cta">
              <h2 id="contact-heading">Let’s build<br />something good.</h2>
              <a href={site.socials.email} className="pill-button"><i aria-hidden="true" />Get in touch</a>
            </div>
          </div>
          <div className="contact-bottom">
            <div className="reach">
              <p className="eyebrow">Reach out</p>
              <div className="email-line">
                <a href={site.socials.email}>{site.email}</a>
                <button type="button" className="copy-email" aria-label={copied ? "Email address copied" : "Copy email address"} onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}</button>
                <span className="copy-status" role="status">{copied ? "Copied!" : copyError ? "Please copy the email address manually." : ""}</span>
              </div>
              <p className="reach-loc">{site.location}</p>
            </div>
            <div className="social-links">
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href={site.socials.email} aria-label="Email"><MdOutlineEmail /></a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer wrap"><span>© {new Date().getFullYear()} Prabharsha</span><a href="#top" className="back-top">Back to top <ArrowUp size={16} /></a></footer>
  </div>;
}
