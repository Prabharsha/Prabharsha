"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, type RefObject } from "react";

import "./page-loader.css";

export default function PageLoader({ content, onReveal }: {
  content: RefObject<HTMLDivElement>;
  onReveal: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const cover = root.current;
    const page = content.current;
    if (!cover || !page) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const q = gsap.utils.selector(cover);
    let disposed = false;
    let revealing = false;
    let finished = false;
    const wasInert = page.inert;
    const overflow = document.documentElement.style.overflow;
    const animation = cover.style.animation;
    let locked = false;
    let exit: gsap.core.Timeline | undefined;

    const unlock = () => {
      page.inert = wasInert;
      document.documentElement.style.overflow = overflow;
    };
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      const hadFocus = cover.contains(document.activeElement);
      cover.hidden = true;
      unlock();
      if (locked) ScrollTrigger.refresh();
      if (hadFocus) page.querySelector<HTMLElement>(".skip-link")?.focus({ preventScroll: true });
    };
    const reveal = (immediate = false) => {
      if (disposed || finished) return;
      if (immediate) {
        exit?.kill();
        onReveal();
        finish();
        return;
      }
      if (revealing) return;
      revealing = true;
      onReveal();
      const status = q<HTMLElement>(".loader-status")[0];
      status.textContent = "Welcome in.";
      gsap.killTweensOf(q(".loader-track-fill"));
      exit = gsap.timeline({ onComplete: finish })
        .to(q(".loader-track-fill"), { scaleX: 1, duration: 0.18, ease: "power2.out" }, 0)
        .to(q(".loader-content"), { y: -28, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1)
        .to(q(".loader-top, .loader-bottom"), { opacity: 0, duration: 0.2 }, 0.1)
        .to(q(".loader-panel"), { yPercent: -101, duration: 0.78, stagger: 0.065, ease: "power4.inOut" }, 0.23);
    };
    skip.current = () => reveal(true);

    // Deep links and restored scroll positions should go straight to their destination.
    if (cover.hidden || motion.matches || window.location.hash || window.scrollY > 0 || getComputedStyle(cover).visibility === "hidden") {
      reveal(true);
      return () => { disposed = true; };
    }

    cover.hidden = false;
    cover.style.animation = "none";
    page.inert = true;
    locked = true;
    document.documentElement.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.from(".loader-letter", { yPercent: 115, rotate: 7, duration: 0.85, stagger: 0.045, ease: "power4.out" });
      gsap.from(".loader-dot", { scale: 0, duration: 0.45, delay: 0.5, ease: "back.out(1.7)" });
      gsap.from(".loader-caption", { opacity: 0, y: 10, duration: 0.6, delay: 0.35, ease: "power3.out" });
      gsap.fromTo(".loader-track-fill", { scaleX: 0 }, { scaleX: 0.86, duration: 2.8, ease: "power2.out" });
    }, cover);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") reveal(true);
    };
    const onMotion = () => { if (motion.matches) reveal(true); };
    document.addEventListener("keydown", onKey);
    motion.addEventListener("change", onMotion);

    let minimum: ReturnType<typeof setTimeout>;
    const beat = new Promise<void>((resolve) => { minimum = setTimeout(resolve, 1250); });
    const portrait = page.querySelector<HTMLImageElement>(".hv2-subject");
    const imageReady = portrait?.decode().catch(() => {}) ?? Promise.resolve();
    Promise.allSettled([document.fonts.ready, imageReady, beat]).then(() => reveal());
    // A slow font or image must never hold the portfolio hostage.
    const deadline = setTimeout(() => reveal(), 2800);
    const failsafe = setTimeout(() => reveal(true), 4500);

    return () => {
      disposed = true;
      clearTimeout(minimum);
      clearTimeout(deadline);
      clearTimeout(failsafe);
      document.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", onMotion);
      exit?.revert();
      ctx.revert();
      unlock();
      cover.style.animation = animation;
      skip.current = () => {};
    };
  }, [content, onReveal]);

  return <>
    <div className="page-loader" ref={root} data-lenis-prevent>
      <div className="loader-panels" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <div className="loader-panel" key={index} />)}
      </div>
      <div className="loader-top">
        <span className="loader-monogram" aria-hidden="true">p<span>.</span></span>
        <button type="button" className="loader-skip" onClick={() => skip.current()}>
          Skip intro <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="loader-content" aria-hidden="true">
        <div className="loader-name">
          {"prabharsha".split("").map((letter, index) => <span className="loader-mask" key={index}><span className="loader-letter">{letter}</span></span>)}
          <span className="loader-dot">.</span>
        </div>
        <p className="loader-caption">From the first idea to the final detail.</p>
      </div>
      <div className="loader-bottom">
        <div className="loader-track" aria-hidden="true"><div className="loader-track-fill" /></div>
        <div className="loader-details">
          <span className="loader-status" role="status">Loading portfolio</span>
          <span className="loader-location">Colombo, Sri Lanka</span>
        </div>
      </div>
    </div>
    <noscript><style>{".page-loader { display: none !important; }"}</style></noscript>
  </>;
}
