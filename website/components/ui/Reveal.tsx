"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "blur" | "scale" | "rise";

const variants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  rise: {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 16 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
};

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
 * With `whileInView` the observer watches the animated box, so the hidden
 * state's own offset can push the element out of the trigger area; the
 * observer then has nothing left to report and the content stays invisible
 * for good. Splitting the two makes the trigger independent of the animation.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  duration = 0.7,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px 0px" });

  // h-full on the inner element keeps `h-full` children working: the wrapper is
  // the grid item that stretches, so the mover must pass that height through.
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full"
        variants={variants[variant]}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
