"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import markup from "./hero-v2/markup";
import "./hero-v2/hero-v2.css";

/**
 * Scroll-driven hero (teal / lime).
 *
 * Layers, back to front: gradient, cursor glow, headline, cut-out portrait,
 * labels. On scroll the whole card
 * shrinks into a code-editor window over a collage of project screens, then
 * the pin releases into the rest of the page.
 *
 * The markup is static, so it is injected as a string; GSAP only touches it
 * after mount. Without JS or with reduced motion the hero stays a plain,
 * readable full-bleed card.
 */
export default function HeroV2() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const q = gsap.utils.selector(el);
    const header = document.querySelector<HTMLElement>(".site-header");
    const headerH = () => header?.offsetHeight ?? 88;
    const syncHeader = () => el.style.setProperty("--hh", `${headerH()}px`);
    syncHeader();
    ScrollTrigger.addEventListener("refreshInit", syncHeader);

    const mm = gsap.matchMedia();
    mm.add(
      {
        full: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        lite: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const full = !!ctx.conditions?.full;

        // 1. page load: headline lines rise through their masks, portrait settles in
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q(".hv2-stage-bg"), { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
          .from(q(".hv2-hl-line > span"), { yPercent: 115, duration: 1.1, stagger: 0.12 }, 0.15)
          .from(q(".hv2-subject"), { y: 70, opacity: 0, duration: 1.4 }, 0.35)
          .from(q(".hv2-meta, .hv2-hint"), { opacity: 0, y: -12, duration: 0.8, stagger: 0.06 }, 0.8);
        if (!full) return () => intro.kill();

        // 2. mouse parallax: portrait moves most, headline less, background against them
        const glow = q(".hv2-glow")[0];
        const layers = ([[".hv2-bg-wrap", -20], [".hv2-intro", 16], [".hv2-subject-wrap", 36]] as const).map(
          ([sel, f]) => ({
            f,
            x: gsap.quickTo(q(sel)[0], "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(q(sel)[0], "y", { duration: 0.9, ease: "power3.out" }),
          }),
        );
        const gx = gsap.quickTo(glow, "x", { duration: 1.1, ease: "power2.out" });
        const gy = gsap.quickTo(glow, "y", { duration: 1.1, ease: "power2.out" });
        gsap.set(glow, { x: innerWidth * 0.6, y: innerHeight * 0.3 });
        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / innerWidth) * 2 - 1;
          const ny = (e.clientY / innerHeight) * 2 - 1;
          const k = Math.min(innerWidth / 1600, 1.3);
          layers.forEach((l) => {
            l.x(nx * l.f * k);
            l.y(ny * l.f * k * 0.7);
          });
          const r = el.getBoundingClientRect();
          gx(e.clientX - r.left);
          gy(e.clientY - r.top);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        // 3. scroll: the hero shrinks into a window card over the project collage
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: () => `top ${headerH()}px`,
            end: "+=170%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(q(".hv2-card"), { scale: 0.46, borderRadius: 56, duration: 1 }, 0)
          .to(q(".hv2-ui, .hv2-glow, .hv2-metas"), { autoAlpha: 0, duration: 0.35 }, 0)
          .to(q(".hv2-chrome"), { autoAlpha: 1, duration: 0.45 }, 0.4)
          .fromTo(
            q(".hv2-tile"),
            { autoAlpha: 0, scale: 1.4 },
            { autoAlpha: 1, scale: 1, duration: 0.9, stagger: { each: 0.05, from: "center" } },
            0.1,
          )
          .to(
            q(".hv2-tile"),
            { y: (_i: number, t: HTMLElement) => -Number(t.dataset.depth) * 34, duration: 1.5, ease: "none" },
            0,
          )
          .to({}, { duration: 0.4 });

        return () => {
          window.removeEventListener("pointermove", onMove);
          intro.kill();
        };
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", syncHeader);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="hv2"
      aria-labelledby="hero-heading"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
