"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const LETTERS = "prabharsha".split("");

let open: () => void = () => {};
/** Resolves the moment the loader starts opening onto the page. HeroV2 waits on it. */
export const revealed = new Promise<void>((resolve) => { open = resolve; });

/**
 * When the page behind the loader is worth showing. The counter holds at 90
 * until this resolves, then the loader opens onto the hero.
 *
 * The window load event (fonts, the hero portrait, first-screen images),
 * capped so a slow asset never keeps a visitor waiting. It never rejects:
 * the hero headline only plays once the loader opens.
 */
function pageReady(): Promise<void> {
  const loaded = document.readyState === "complete"
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  return Promise.race([loaded, new Promise<void>((resolve) => setTimeout(resolve, 5000))]);
}

/**
 * Intro loader. The wordmark sets letter by letter through its masks, then the
 * letters leave and the full stop glides to the centre of the screen, swells
 * into a lime iris that floods the viewport, and opens from that same point
 * onto the hero just as the hero's own intro starts.
 *
 * The whole iris is one radial-gradient background driven by two custom
 * properties (--iris, the lime edge; --hole, the see-through centre), so the
 * reveal costs a single layer repaint per frame and no masks or clip paths.
 * Without JS a CSS failsafe fades the loader out on its own.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // The script is running, so the CSS failsafe is not needed. In a background
    // tab GSAP waits for the tab to be shown, and the failsafe must not fire
    // first and leave the hero headline parked.
    el.style.animation = "none";

    // Every load opens on the loader at the top, with no restored scroll position.
    history.scrollRestoration = "manual";
    const toTop = () => window.scrollTo({ top: 0, behavior: "instant" });
    toTop();
    // The moment the page opens (under full cover): back to the top again in
    // case the browser jumped to a #section after load, and drop that hash so
    // the next reload cannot jump there either. It waits until now because
    // Next rewrites the URL from its own state right after mount.
    const reveal = () => {
      toTop();
      if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
      open();
    };

    // Hold the page still underneath. Stopping the wheel here keeps it from
    // ever reaching Lenis; lenis.stop() would hide the scrollbar and shift the
    // pinned hero sideways when it came back.
    const block = (e: Event) => { e.preventDefault(); e.stopPropagation(); };
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });

    let live = true;
    const ctx = gsap.context(() => {}, el);
    const q = gsap.utils.selector(el);
    const hide = () => { gsap.set(el, { display: "none" }); };
    const cleanup = () => {
      live = false;
      ctx.revert();
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pageReady().then(() => live && ctx.add(() => {
        reveal();
        gsap.to(el, { autoAlpha: 0, duration: 0.4, ease: "power1.out", onComplete: hide });
      }));
      return cleanup;
    }

    const count = q(".loader-count")[0];
    const bar = q(".loader-bar")[0];
    const meter = { v: 0 };
    const draw = () => {
      count.textContent = String(Math.round(meter.v)).padStart(3, "0");
      bar.style.transform = `scaleX(${meter.v / 100})`;
    };

    // 1. the wordmark sets (CSS parks the letters below their masks for first paint)
    const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
    ctx.add(() => {
      intro
        .to(q(".loader-glow"), { autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 0)
        .to(q(".loader-ch > span"), { y: 0, duration: 1.1, stagger: 0.05 }, 0.1)
        .to(q(".loader-dot"), { scale: 1, duration: 0.8, ease: "expo.out" }, 0.8)
        .to(meter, { v: 90, duration: 1.6, ease: "power2.out", onUpdate: draw }, 0);
    });
    document.fonts.ready.then(() => { if (live) intro.play(); });

    // 2. the full stop becomes the iris and opens onto the page
    const finish = () => {
      const dot = q(".loader-dot")[0];
      const d = dot.getBoundingClientRect();
      const r = d.width / 2;
      const cx = el.clientWidth / 2;
      const cy = el.clientHeight / 2;
      const reach = Math.hypot(cx, cy) + 2;
      gsap.timeline({ onComplete: hide })
        .to(meter, { v: 100, duration: 0.35, ease: "power2.out", onUpdate: draw })
        .addLabel("out")
        .to(q(".loader-meter"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, "out")
        .to(q(".loader-ch > span"), { yPercent: -110, duration: 0.55, ease: "power3.in", stagger: { each: 0.025, from: "end" } }, "out")
        .to(q(".loader-glow, .loader-grain"), { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "out+=0.3")
        .to(dot, { x: cx - d.left - r, y: cy - d.top - r, duration: 0.8, ease: "expo.inOut" }, "out+=0.15")
        // the gradient circle takes over from the dot at exactly its size, so the swap is invisible
        .set(el, { "--iris": `${r}px` }, "out+=0.95")
        .set(dot, { autoAlpha: 0 }, "out+=0.95")
        .to(el, { "--iris": `${reach}px`, duration: 0.6, ease: "expo.in" }, "out+=0.95")
        .call(reveal, undefined, "out+=1.55")
        .to(el, { "--hole": `${reach + 2}px`, duration: 1.3, ease: "expo.out" }, "out+=1.55");
    };
    Promise.all([intro.then(), pageReady()]).then(() => live && ctx.add(finish));

    return cleanup;
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader-grain" />
      <div className="loader-glow" />
      <div className="loader-mark">
        {LETTERS.map((ch, i) => <span key={i} className="loader-ch"><span>{ch}</span></span>)}
        <i className="loader-dot" />
      </div>
      <div className="loader-meter">
        <span className="loader-track"><span className="loader-bar" /></span>
        <span className="loader-count">000</span>
      </div>
    </div>
  );
}
