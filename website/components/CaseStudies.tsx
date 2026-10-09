"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { caseStudies, type CaseStudy } from "@/data/caseStudies";

type SiteMedia = Extract<CaseStudy["media"], { kind: "site" }>;
type PhoneMedia = Extract<CaseStudy["media"], { kind: "phones" }>;

/** Browser window that slowly scrolls through real captures of the live site. */
function SiteShowcase({ media, title }: { media: SiteMedia; title: string }) {
  return (
    <div className="cs-site">
      <div className="cs-tilt">
        <div className="cs-browser">
          <div className="cs-browser-bar" aria-hidden="true">
            <i /><i /><i />
            <span className="cs-url"><Lock size={11} />{media.url}</span>
          </div>
          <div className="cs-viewport">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cs-scroll" src={media.page} width={800} height={2525} loading="lazy" decoding="async"
              alt={`${title} website: hero, lessons, packages, Weligama bay gallery and surf-spot map`} />
          </div>
        </div>
      </div>
      <figure className="cs-peek">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.peek} width={800} height={505} loading="lazy" decoding="async" alt={media.peekAlt} />
      </figure>
      <ul className="cs-badges" aria-label="Highlights">
        {media.badges.map((b, i) => <li key={b} style={{ ["--i" as string]: i }}><Check size={13} aria-hidden="true" />{b}</li>)}
      </ul>
    </div>
  );
}

/** Three phones fanned out; the front one cycles through real app screens. */
function PhoneShowcase({ media, title }: { media: PhoneMedia; title: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const count = media.screens.length;

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    const id = window.setInterval(() => { if (visible && !paused) setCurrent((c) => (c + 1) % count); }, 2600);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, [count, paused]);

  const back = [media.screens[2], media.screens[4]];
  return (
    <div className="cs-phones" ref={box} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="cs-phone-slot cs-phone-slot--left"><div className="cs-phone cs-phone--side">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={back[0].src} alt={back[0].alt} width={432} height={960} loading="lazy" decoding="async" />
      </div></div>
      <div className="cs-phone-slot cs-phone-slot--right"><div className="cs-phone cs-phone--side">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={back[1].src} alt={back[1].alt} width={432} height={960} loading="lazy" decoding="async" />
      </div></div>
      <div className="cs-phone-slot cs-phone-slot--center"><div className="cs-phone cs-phone--front" aria-live="polite">
        {media.screens.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s.src} src={s.src} alt={i === current ? s.alt : ""} aria-hidden={i !== current} width={432} height={960}
            loading="lazy" decoding="async" className={i === current ? "is-on" : ""} />
        ))}
      </div></div>
      <div className="cs-dots" role="group" aria-label={`${title} screens`}>
        {media.screens.map((s, i) => (
          <button key={s.src} type="button" aria-label={`Show screen ${i + 1}: ${s.alt}`} aria-pressed={i === current} onClick={() => setCurrent(i)} />
        ))}
      </div>
      <ul className="cs-badges" aria-label="Highlights">
        {media.badges.map((b, i) => <li key={b} style={{ ["--i" as string]: i }}><Check size={13} aria-hidden="true" />{b}</li>)}
      </ul>
    </div>
  );
}

function Study({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className={`cs ${index % 2 ? "cs--flip" : ""}`} id={`case-${study.slug}`} aria-labelledby={`case-${study.slug}-title`}>
      <div className="cs-media">
        {study.media.kind === "site" ? <SiteShowcase media={study.media} title={study.title} /> : <PhoneShowcase media={study.media} title={study.title} />}
      </div>
      <div className="cs-copy">
        <p className="cs-kicker"><span>{String(index + 1).padStart(2, "0")}</span>{study.kicker}</p>
        <h3 id={`case-${study.slug}-title`}>{study.title}<span>.</span></h3>
        <p className="cs-summary">{study.summary}</p>
        {study.stats && (
          <dl className="cs-stats">
            {study.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
          </dl>
        )}
        <ol className={`cs-blocks ${study.media.kind === "site" ? "cs-blocks--steps" : ""}`}>
          {study.blocks.map((b, i) => (
            <li key={b.title}>
              <strong>{study.media.kind === "site" && <em>{String(i + 1).padStart(2, "0")}</em>}{b.title}</strong>
              <p>{b.text}</p>
            </li>
          ))}
        </ol>
        {study.checklist && (
          <div className="cs-checklist">
            <p>{study.checklist.title}</p>
            <ul>{study.checklist.items.map((it) => <li key={it}><Check size={13} aria-hidden="true" />{it}</li>)}</ul>
          </div>
        )}
        <ul className="tag-list" aria-label={`${study.title} technologies`}>{study.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <a className="pill-button cs-cta" href={study.link.href} target="_blank" rel="noopener noreferrer"><i aria-hidden="true" />{study.link.label} <ArrowUpRight size={16} /></a>
      </div>
      {study.spotlight && (
        <div className="cs-spot">
          <div className="cs-spot-copy">
            <p className="cs-kicker"><span>Highlight</span>Trip replay</p>
            <h4>{study.spotlight.title}</h4>
            <p>{study.spotlight.text}</p>
            <ul>{study.spotlight.points.map((pt) => <li key={pt}><Check size={13} aria-hidden="true" />{pt}</li>)}</ul>
          </div>
          <figure className="cs-spot-pair">
            {study.spotlight.screens.map((s) => (
              <div key={s.src} className="cs-phone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} width={432} height={960} loading="lazy" decoding="async" />
              </div>
            ))}
          </figure>
        </div>
      )}
    </article>
  );
}

/**
 * Featured case studies at the top of the work section. Scroll choreography
 * (desktop, motion allowed): the browser frame tilts upright and the phones
 * fan out from a stack as each study scrolls into view.
 */
export default function CaseStudies() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const st = (trigger: Element) => ({ trigger, start: "top 85%", end: "center 55%", scrub: 0.8 });
      q<HTMLElement>(".cs-site").forEach((site) => {
        gsap.fromTo(site.querySelector(".cs-tilt"), { rotateX: 22, rotateZ: -3, y: 60, scale: 0.92 }, { rotateX: 0, rotateZ: 0, y: 0, scale: 1, ease: "none", scrollTrigger: st(site) });
        gsap.fromTo(site.querySelector(".cs-peek"), { x: -80, y: 60, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: "none", scrollTrigger: st(site) });
      });
      q<HTMLElement>(".cs-phones").forEach((ph) => {
        gsap.fromTo(ph.querySelector(".cs-phone-slot--left"), { xPercent: 55, rotate: 6, autoAlpha: 0.4 }, { xPercent: 0, rotate: 0, autoAlpha: 1, ease: "none", scrollTrigger: st(ph) });
        gsap.fromTo(ph.querySelector(".cs-phone-slot--right"), { xPercent: -55, rotate: -6, autoAlpha: 0.4 }, { xPercent: 0, rotate: 0, autoAlpha: 1, ease: "none", scrollTrigger: st(ph) });
        gsap.fromTo(ph.querySelector(".cs-phone-slot--center"), { y: 80 }, { y: 0, ease: "none", scrollTrigger: st(ph) });
      });
      q<HTMLElement>(".cs-spot").forEach((spot) => {
        // the pair slides together from a single stack
        gsap.from(spot.querySelectorAll(".cs-spot-pair .cs-phone"), { y: 90, xPercent: (i: number) => (i ? -40 : 0), autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: spot, start: "top 80%" } });
      });
      q<HTMLElement>(".cs-copy").forEach((copy) => {
        gsap.from(copy.children, { y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: copy, start: "top 80%" } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="cs-list" ref={root}>
      {caseStudies.map((s, i) => <Study key={s.slug} study={s} index={i} />)}
    </div>
  );
}
