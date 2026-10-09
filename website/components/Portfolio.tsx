"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowUp, Menu, X, Pause, Play, Download, Copy, Check } from "lucide-react";
import { site, experience, services } from "@/data/site";

import HeroV2 from "./HeroV2";
import SkillsProjects from "./SkillsProjects";

const links = [{ href: "#work", label: "Work" }, { href: "#skills", label: "Skills" }, { href: "#about", label: "About" }, { href: "#contact", label: "Contact" }];

function CoffeeFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const manualPause = useRef(false);
  useEffect(() => {
    const film = video.current;
    if (!film) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const play = () => { if (!manualPause.current && !motion.matches && !document.hidden) film.play().catch(() => {}); };
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) play(); else film.pause(); }, { threshold: 0.2 });
    observer.observe(film);
    const preference = () => { if (motion.matches) film.pause(); };
    const visibility = () => { if (document.hidden) film.pause(); else if (film.getBoundingClientRect().bottom > 0 && film.getBoundingClientRect().top < innerHeight) play(); };
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); film.pause(); motion.removeEventListener("change", preference); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <figure className="coffee-film">
    <video ref={video} muted loop playsInline preload="none" poster="/videos/hero-coffee.jpg" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="Animated Prabharsha enjoying coffee at his desk">
      <source src="/videos/hero-coffee.webm" type="video/webm" />
      <source src="/videos/hero-coffee.mp4" type="video/mp4" />
    </video>
    <figcaption><span>A little coffee. A lot of curiosity.</span><button type="button" className="film-control" disabled={failed} aria-label={failed ? "Animation unavailable" : playing ? "Pause coffee animation" : "Play coffee animation"} onClick={() => { const film = video.current; if (!film) return; manualPause.current = !film.paused; if (film.paused) film.play().catch(() => setFailed(true)); else film.pause(); }}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></figcaption>
  </figure>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const menuButton = useRef<HTMLButtonElement>(null);
  const page = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = root.querySelectorAll<HTMLElement>(".lab-heading, .section-top, .skill-workbench");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!preference.matches) entry.target.animate([{ clipPath: "inset(0 0 12% 0)", transform: "translateY(18px)", opacity: .65 }, { clipPath: "inset(0 0 0 0)", transform: "translateY(0)", opacity: 1 }], { duration: 650, easing: "cubic-bezier(.16,1,.3,1)" });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });
    targets.forEach(target => observer.observe(target));
    const stopMotion = () => { if (preference.matches) root.getAnimations({ subtree: true }).forEach(animation => animation.finish()); };
    preference.addEventListener("change", stopMotion);
    return () => { observer.disconnect(); preference.removeEventListener("change", stopMotion); root.getAnimations({ subtree: true }).forEach(animation => animation.cancel()); };
  }, []);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setCopyError(false); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2500); }
    catch { setCopyError(true); }
  }
  return <div className="portfolio" ref={page}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="header-inner wrap">
        <a href="#top" className="wordmark" aria-label="Prabharsha, back to top">prabharsha<span>.</span></a>
        <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <a href={site.resume} className="resume-link" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={16} /></a>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!menuOpen}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={18} /></a>)}</nav>
    </header>
    <main id="main">
      <HeroV2 />
      <SkillsProjects />
      <section id="about" className="about-section wrap section-space" aria-labelledby="about-heading">
        <div className="about-intro"><h2 id="about-heading">Serious about the work.<br /><em>Human</em> about the rest.</h2><div className="about-description"><p>{site.bio}</p><p>I care about clean architecture, dependable APIs and interfaces that feel effortless. Outside of work, I build side projects to learn new tools across the stack.</p><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">A little more about me <ArrowUpRight size={18} /></a></div></div>
        <div className="about-media"><CoffeeFilm /></div>
        <div id="services" className="practice"><h3>From the first idea<br />to the final detail.</h3><div className="service-list">{services.map(service => <div key={service.key}><h4>{service.title}</h4><p>{service.description}</p></div>)}</div></div>
      </section>
      <section id="experience" className="experience-section" aria-labelledby="experience-heading"><div className="wrap section-space experience-grid"><div className="experience-heading"><h2 id="experience-heading">Built on<br /><em>experience.</em></h2><p>Working on the systems<br />people count on every day.</p><a className="text-link" href={site.resume} target="_blank" rel="noopener noreferrer">Read my résumé <Download size={17} /></a></div><div className="career">{experience.map(job => <article className="employer" key={job.company}><h3>{job.company}</h3>{job.roles.map(role => <div className="career-role" key={role.title}><p className="period">{role.period}</p><h4>{role.title}</h4><p>{role.detail}</p></div>)}</article>)}</div></div></section>
      <section id="contact" className="contact-section wrap section-space" aria-labelledby="contact-heading"><a href={site.socials.email} className="contact-title"><h2 id="contact-heading">Let’s build<br /><em>something good.</em></h2><ArrowUpRight aria-hidden="true" /></a><div className="contact-bottom"><div className="email-line"><a href={site.socials.email}>{site.email}</a><button type="button" className="copy-email" aria-label={copied ? "Email address copied" : "Copy email address"} onClick={copyEmail}>{copied ? <Check size={18} /> : <Copy size={18} />}</button><span className="copy-status" role="status">{copied ? "Copied!" : copyError ? "Please copy the email address manually." : ""}</span></div><div className="social-links"><a href={site.socials.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></div></section>
    </main>
    <footer className="footer wrap"><a href="#top" className="wordmark">prabharsha<span>.</span></a><span>© {new Date().getFullYear()} Prabharsha</span><a href="#top" className="back-top">Back to top <ArrowUp size={16} /></a></footer>
  </div>;
}
