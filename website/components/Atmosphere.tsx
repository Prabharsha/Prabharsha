"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

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

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function paletteAt(p: number, key: string): string {
  const [day, dusk, night] = STOPS[key];
  let from: RGB, to: RGB, t: number;
  if (p < 0.5) {
    from = day;
    to = dusk;
    t = p / 0.5;
  } else {
    from = dusk;
    to = night;
    t = (p - 0.5) / 0.5;
  }
  return `${lerp(from[0], to[0], t)} ${lerp(from[1], to[1], t)} ${lerp(from[2], to[2], t)}`;
}

function applyPalette(p: number) {
  const root = document.documentElement;
  for (const key of KEYS) {
    root.style.setProperty(key, paletteAt(p, key));
  }
}

type GlowProps = {
  className: string;
  depth: number;
  delay: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
};

function Glow({ className, depth, delay, mx, my }: GlowProps) {
  const x = useTransform(mx, [0, 1], [depth, -depth]);
  const y = useTransform(my, [0, 1], [depth, -depth]);
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        x,
        y,
        background:
          "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft) / 0.35) 0%, transparent 70%)",
        filter: "blur(70px)",
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.4, delay, ease: "easeOut" }}
    />
  );
}

export default function Atmosphere() {
  const { scrollYProgress } = useScroll();

  // Cursor parallax for the light glows.
  const mxRaw = useMotionValue(0.5);
  const myRaw = useMotionValue(0.5);
  const mx = useSpring(mxRaw, { stiffness: 40, damping: 20, mass: 0.6 });
  const my = useSpring(myRaw, { stiffness: 40, damping: 20, mass: 0.6 });

  // Last palette step written to :root; repeat scroll events become no-ops.
  const step = useRef(-1);
  const frame = useRef(0);

  // Sun: rises high & bright at the top-right, arcs down toward the right
  // corner and sets below the horizon by the bottom of the page.
  const sunTop = useTransform(scrollYProgress, [0, 1], ["12%", "104%"]);
  const sunLeft = useTransform(scrollYProgress, [0, 1], ["70%", "94%"]);
  const sunScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.78, 0.6]);
  const sunOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85],
    [1, 0.85, 0]
  );
  const starsOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.92],
    [0, 0.8]
  );

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Set initial palette from current scroll position.
    const start = reduce ? 0.85 : scrollYProgress.get();
    step.current = Math.round(start * STEPS);
    applyPalette(step.current / STEPS);

    const onMove = (e: PointerEvent) => {
      mxRaw.set(e.clientX / window.innerWidth);
      myRaw.set(e.clientY / window.innerHeight);
    };
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [scrollYProgress, mxRaw, myRaw]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (Math.round(p * STEPS) === step.current || frame.current) return;
    // Defer the :root write out of the scroll handler so it lands at most once
    // per frame and never forces style recalc mid-scroll.
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const next = Math.round(scrollYProgress.get() * STEPS);
      if (next === step.current) return;
      step.current = next;
      applyPalette(next / STEPS);
    });
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Sky base + vertical depth grading */}
      <div className="absolute inset-0 bg-[rgb(var(--surface))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      {/* Horizon glow that tracks the sun */}
      <motion.div
        className="absolute h-[60vh] w-[120vw] -translate-x-1/2 rounded-[50%]"
        style={{
          top: sunTop,
          left: sunLeft,
          opacity: sunOpacity,
          background:
            "radial-gradient(closest-side, rgb(var(--accent-soft) / 0.45), rgb(var(--accent) / 0.18) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* The sun */}
      <motion.div
        className="absolute h-[26vh] w-[26vh] -translate-x-1/2 rounded-full"
        style={{
          top: sunTop,
          left: sunLeft,
          scale: sunScale,
          opacity: sunOpacity,
          background:
            "radial-gradient(circle at 50% 50%, rgb(var(--accent-soft)) 0%, rgb(var(--accent) / 0.85) 32%, rgb(var(--accent-deep) / 0.25) 55%, transparent 72%)",
          filter: "blur(8px)",
        }}
      />

      {/* Parallax light studies */}
      <Glow
        className="-left-[10%] top-[8%] h-[55vh] w-[55vh]"
        depth={55}
        delay={0.3}
        mx={mx}
        my={my}
      />
      <Glow
        className="right-[-12%] top-[45%] h-[50vh] w-[50vh]"
        depth={-50}
        delay={0.7}
        mx={mx}
        my={my}
      />

      {/* Stars fade in at night */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: starsOpacity,
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
