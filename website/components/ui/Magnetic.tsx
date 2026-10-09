"use client";

import { createAnimatable, type AnimatableObject } from "animejs";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE_FOLLOW, isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Wraps an element so it is gently pulled toward the cursor on hover,
 * then springs back on leave. Pointer-only (no effect on touch).
 *
 * The pull runs on an anime.js animatable: pointer events only push a target
 * number into it, and anime interpolates toward that number on its own shared
 * frame loop. Nothing here re-renders, and no listener is attached at all on
 * touch or when motion is reduced.
 */
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pull = useRef<AnimatableObject | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const anim = createAnimatable(el, {
      x: 380,
      y: 380,
      ease: EASE_FOLLOW,
    });
    pull.current = anim;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      anim.x((e.clientX - (r.left + r.width / 2)) * strength);
      anim.y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      anim.x(0);
      anim.y(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      anim.revert();
      pull.current = null;
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </div>
  );
}
