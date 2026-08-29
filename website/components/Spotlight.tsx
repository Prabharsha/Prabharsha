"use client";

import { useEffect, useRef } from "react";

/**
 * A radial glow that follows the cursor inside its parent container.
 * Disabled on touch devices and when reduced motion is preferred.
 *
 * The gradient is declared once in CSS and only its centre is updated, via two
 * custom properties on this element. That keeps the cursor handler free of
 * getComputedStyle / background re-parsing, both of which forced a synchronous
 * style recalculation on every single pointer move.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const parent = el.parentElement;
    if (!parent) return;

    let frame = 0;
    let cx = 0;
    let cy = 0;

    // Measure and write together, once per frame. The hero moves as the page
    // scrolls, so the rect has to be re-read, but doing it here keeps the one
    // layout read batched with the write instead of one per pointer event.
    const paint = () => {
      frame = 0;
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${cx - rect.left}px`);
      el.style.setProperty("--spot-y", `${cy - rect.top}px`);
      el.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="spotlight pointer-events-none absolute inset-0 -z-[1] opacity-0 transition-opacity duration-300"
    />
  );
}
