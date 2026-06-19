"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "blur" | "scale" | "rise";

const variants: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  rise: {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: "blur(14px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 16 },
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

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  duration = 0.7,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
