"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
};

/**
 * Counts up once the number scrolls into view. The running value is written
 * straight to the DOM node instead of through state: four of these tick
 * together, and a re-render per frame each is a needless tax on a stretch of
 * the page that is already animating.
 */
export default function Counter({ to, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const node = out.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = String(Math.floor(v));
      },
      onComplete: () => {
        node.textContent = String(to);
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      <span ref={out}>0</span>
      {suffix}
    </span>
  );
}
