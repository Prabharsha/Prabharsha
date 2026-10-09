"use client";

import { createAnimatable, utils, type AnimatableObject } from "animejs";
import { useEffect, useRef } from "react";

import { EASE_FOLLOW, prefersReducedMotion } from "@/lib/motion";

type RGB = [number, number, number];

/**
 * Palette stops: [day, dusk, night]. Text stays light throughout; the sky,
 * accent and muted tones shift as the user scrolls from "day" to "night".
 */
const STOPS: Record<string, [RGB, RGB, RGB]> = {
  "--surface": [
    [46, 26, 16], // warm dawn sky
    [38, 22, 52], // dusk plum
    [7, 9, 20], // deep night
  ],
  "--ink": [
    [255, 244, 230],
    [245, 238, 248],
    [231, 236, 255],
  ],
  "--muted": [
    [208, 184, 162],
    [196, 176, 192],
    [150, 162, 192],
  ],
  "--accent": [
    [245, 180, 80], // gold
    [244, 122, 150], // rose
    [125, 211, 252], // moonlight cyan
  ],
  "--accent-soft": [
    [255, 208, 132],
    [250, 162, 184],
    [173, 226, 255],
  ],
  "--accent-deep": [
    [212, 142, 44],
    [212, 92, 122],
    [80, 170, 230],
  ],
  "--violet": [
    [245, 152, 92],
    [212, 120, 200],
    [150, 140, 250],
  ],
};

const KEYS = Object.keys(STOPS);

/**
 * Writing to :root invalidates style for the whole document, and every blurred
 * sky layer and glass panel below depends on these vars. So the palette is
 * quantised into steps: a full-page scroll repaints the sky ~STEPS times
 * instead of once per scroll event, while still reading as a continuous fade.
 */
const STEPS = 48;

function paletteAt(p: number, key: string): string {
  const [day, dusk, night] = STOPS[key];
  const from = p < 0.5 ? day : dusk;
  const to = p < 0.5 ? dusk : night;
  const t = p < 0.5 ? p / 0.5 : (p - 0.5) / 0.5;
  const r = Math.round(utils.lerp(from[0], to[0], t));
  const g = Math.round(utils.lerp(from[1], to[1], t));
  const b = Math.round(utils.lerp(from[2], to[2], t));
  return r + " " + g + " " + b;
}

function applyPalette(p: number) {
  const root = document.documentElement;
  for (const key of KEYS) root.style.setProperty(key, paletteAt(p, key));
}

/** Scroll progress through the whole document, clamped to 0..1. */
function scrollProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : utils.clamp(window.scrollY / max, 0, 1);
}

/** Where the sun sits, how big and how bright, at a given scroll progress. */
function arc(p: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return {
    // Percentages of the viewport resolved to px, so the whole arc composites
    // as a transform instead of re-laying-out `top`/`left` every frame.
    x: (0.7 + p * 0.24) * vw,
    y: (0.12 + p * 0.92) * vh,
    scale:
      p < 0.6
        ? utils.mapRange(p, 0, 0.6, 1, 0.78)
        : utils.mapRange(p, 0.6, 1, 0.78, 0.6),
    opacity:
      p < 0.55
        ? utils.mapRange(p, 0, 0.55, 1, 0.85)
        : utils.clamp(utils.mapRange(p, 0.55, 0.85, 0.85, 0), 0, 1),
    stars: utils.clamp(utils.mapRange(p, 0.55, 0.92, 0, 0.8), 0, 0.8),
  };
}

export default function Atmosphere() {
  const sunRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sun = sunRef.current;
    const halo = haloRef.current;
    const stars = starsRef.current;
    const glowA = glowARef.current;
    const glowB = glowBRef.current;
    if (!sun || !halo || !stars || !glowA || !glowB) return;

    const reduce = prefersReducedMotion();
    const animatables: AnimatableObject[] = [];

    /* ------------------- sun + sky, driven by scroll ------------------- */

    // The sun's arc is scroll-*linked*, not scroll-triggered, so it rides on
    // animatables with a short follow duration. anime smooths between the
    // quantised scroll samples on its own frame loop, which is what the two
    // framer springs used to do, minus the per-value React subscriptions.
    const follow = reduce ? 0 : 220;
    const sunAnim = createAnimatable(sun, {
      x: follow,
      y: follow,
      scale: follow,
      opacity: follow,
      ease: EASE_FOLLOW,
    });
    const haloAnim = createAnimatable(halo, {
      x: follow,
      y: follow,
      opacity: follow,
      ease: EASE_FOLLOW,
    });
    const starsAnim = createAnimatable(stars, {
      opacity: reduce ? 0 : 400,
      ease: "linear",
    });
    animatables.push(sunAnim, haloAnim, starsAnim);

    // Last palette step written to :root; repeat scroll events become no-ops.
    let step = -1;
    let frame = 0;

    // `snap` skips the follow duration. Used for the very first paint and on
    // resize, where easing toward the new position would read as a glitch
    // rather than as motion.
    const render = (snap = false) => {
      frame = 0;
      const p = scrollProgress();
      const a = arc(p);
      const d = snap ? 0 : undefined;

      sunAnim.x(a.x, d);
      sunAnim.y(a.y, d);
      sunAnim.scale(a.scale, d);
      sunAnim.opacity(a.opacity, d);
      haloAnim.x(a.x, d);
      haloAnim.y(a.y, d);
      haloAnim.opacity(a.opacity, d);
      starsAnim.opacity(a.stars, d);

      const next = Math.round(p * STEPS);
      if (next !== step) {
        step = next;
        applyPalette(next / STEPS);
      }
    };

    // Defer every scroll response out of the event handler so it lands at most
    // once per frame and never forces a style recalc mid-scroll.
    const onScrollEvent = () => {
      if (!frame) frame = requestAnimationFrame(() => render());
    };
    const onResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => render(true));
    };

    if (reduce) {
      // Skip straight to night and leave the sky static.
      step = Math.round(0.85 * STEPS);
      applyPalette(step / STEPS);
      const a = arc(0.85);
      sunAnim.x(a.x, 0);
      sunAnim.y(a.y, 0);
      sunAnim.opacity(0, 0);
      starsAnim.opacity(0.8, 0);
    } else {
      render(true);
      window.addEventListener("scroll", onScrollEvent, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
    }

    /* ---------------- cursor parallax on the light studies ---------------- */

    let onPointer: ((e: PointerEvent) => void) | null = null;
    if (!reduce) {
      const a = createAnimatable(glowA, { x: 900, y: 900, ease: EASE_FOLLOW });
      const b = createAnimatable(glowB, { x: 900, y: 900, ease: EASE_FOLLOW });
      animatables.push(a, b);

      onPointer = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        a.x(-nx * 110);
        a.y(-ny * 110);
        b.x(nx * 100);
        b.y(ny * 100);
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScrollEvent);
      window.removeEventListener("resize", onResize);
      if (onPointer) window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
      for (const a of animatables) a.revert();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Sky base + vertical depth grading */}
      <div className="absolute inset-0 bg-[rgb(var(--surface))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      {/* Horizon glow that tracks the sun */}
      {/* Anchored at the top-left and pulled back by half its own width, so the
          transform anime writes positions its centre-x / top edge — matching
          how the arc was framed when it rode on `top`/`left`. */}
      <div
        ref={haloRef}
        className="absolute left-0 top-0 -ml-[60vw] h-[60vh] w-[120vw] rounded-[50%] opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--accent-soft) / 0.45), rgb(var(--accent) / 0.18) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* The sun */}
      <div
        ref={sunRef}
        className="absolute left-0 top-0 -ml-[13vh] h-[26vh] w-[26vh] rounded-full opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft)) 0%, rgb(var(--accent) / 0.85) 32%, rgb(var(--accent-deep) / 0.25) 55%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />

      {/* Parallax light studies.
          Two nested elements on purpose: the outer one carries the cursor
          parallax that anime writes continuously, the inner one carries the
          one-shot entrance. Sharing a single node would mean the entrance's
          `transform` and the parallax's `transform` overwriting each other. */}
      <div
        ref={glowARef}
        className="absolute -left-[10%] top-[8%] h-[55vh] w-[55vh] will-change-transform"
      >
        <div
          className="h-full w-full animate-glow-in rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft) / 0.35) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>
      <div
        ref={glowBRef}
        className="absolute right-[-12%] top-[45%] h-[50vh] w-[50vh] will-change-transform"
      >
        <div
          className="h-full w-full animate-glow-in-late rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft) / 0.35) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Stars fade in at night */}
      <div
        ref={starsRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage:
            "radial-gradient(1.4px 1.4px at 20% 30%, rgba(255,255,255,0.9), transparent), radial-gradient(1.2px 1.2px at 70% 20%, rgba(255,255,255,0.8), transparent), radial-gradient(1.6px 1.6px at 40% 70%, rgba(255,255,255,0.85), transparent), radial-gradient(1.1px 1.1px at 85% 60%, rgba(255,255,255,0.7), transparent), radial-gradient(1.3px 1.3px at 55% 45%, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.6), transparent), radial-gradient(1.5px 1.5px at 90% 35%, rgba(255,255,255,0.85), transparent), radial-gradient(1px 1px at 30% 15%, rgba(255,255,255,0.6), transparent)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Faint grid texture */}
      <div className="bg-grid absolute inset-0" />

      {/* Subtle film grain for a cinematic finish */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
