"use client";

import { animate, utils } from "animejs";
import { useEffect, useRef } from "react";

import { observeInView, prefersReducedMotion } from "@/lib/motion";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
};

/**
 * Counts up once the number scrolls into view.
 *
 * anime tweens a plain object and the running value is written straight to the
 * DOM node rather than through state: four of these tick together, and a
 * re-render per frame each is a needless tax on a stretch of the page that is
 * already animating. `modifier` rounds inside the tween so the callback never
 * has to.
 */
export default function Counter({ to, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = ref.current;
    const node = out.current;
    if (!box || !node) return;

    if (prefersReducedMotion()) {
      node.textContent = String(to);
      return;
    }

    let started = false;
    const stop = observeInView(box, (inView) => {
      if (!inView || started) return;
      started = true;
      stop();

      const state = { v: 0 };
      animate(state, {
        v: to,
        duration: duration * 1000,
        ease: "outExpo",
        modifier: utils.round(0),
        onUpdate: () => {
          node.textContent = String(state.v);
        },
        onComplete: () => {
          node.textContent = String(to);
        },
      });
    });

    return stop;
  }, [to, duration]);

  return (
    <span ref={ref}>
      <span ref={out}>0</span>
      {suffix}
    </span>
  );
}
