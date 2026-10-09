"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  hiddenStyle,
  observeInView,
  playIn,
  playOut,
  prefersReducedMotion,
  setHidden,
  setShown,
  type RevealVariant,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
};

/**
 * Scroll reveal that replays each time the element comes back into view.
 *
 * Visibility is observed on a plain wrapper, never on the element that moves.
 * If the observer watched the animated box, the hidden state's own offset could
 * push the element out of the trigger area; the observer would then have
 * nothing left to report and the content would stay invisible for good.
 * Splitting the two makes the trigger independent of the animation.
 *
 * The trigger is a page-wide shared IntersectionObserver and the motion runs on
 * anime.js, so a reveal costs no React render and no observer of its own.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  duration = 0.7,
  className,
}: RevealProps) {
  const trigger = useRef<HTMLDivElement>(null);
  const mover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mover.current;
    const box = trigger.current;
    if (!el || !box) return;

    if (prefersReducedMotion()) {
      setShown(el, variant);
      return;
    }

    setHidden(el, variant);
    return observeInView(box, (inView) => {
      if (inView) playIn(el, variant, duration, delay);
      else playOut(el, variant);
    });
  }, [variant, delay, duration]);

  // h-full on the inner element keeps `h-full` children working: the wrapper is
  // the grid item that stretches, so the mover must pass that height through.
  return (
    <div ref={trigger} className={className}>
      <div
        ref={mover}
        className="h-full will-change-[transform,opacity]"
        style={hiddenStyle(variant)}
      >
        {children}
      </div>
    </div>
  );
}
