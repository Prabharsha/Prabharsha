"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";

type BlobProps = {
  colorVar: string;
  posClass: string;
  animClass: string;
  depth: number;
  delay: number;
  opacity: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
};

function Blob({
  colorVar,
  posClass,
  animClass,
  depth,
  delay,
  opacity,
  mx,
  my,
}: BlobProps) {
  // "Magnetic" parallax: blobs drift relative to the cursor.
  const x = useTransform(mx, [0, 1], [depth, -depth]);
  const y = useTransform(my, [0, 1], [depth, -depth]);

  return (
    // Outer: cursor parallax (x/y).
    <motion.div
      className={`absolute rounded-full ${posClass}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 2.4, delay, ease: "easeOut" }}
    >
      {/* Inner: slow organic drift (own transform, no conflict with parallax). */}
      <div
        className={`h-full w-full rounded-full ${animClass}`}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(${colorVar}) / 0.9) 0%, rgb(var(${colorVar}) / 0.4) 40%, transparent 72%)`,
          filter: "blur(64px)",
        }}
      />
    </motion.div>
  );
}

export default function Background() {
  const mxRaw = useMotionValue(0.5);
  const myRaw = useMotionValue(0.5);
  const mx = useSpring(mxRaw, { stiffness: 40, damping: 20, mass: 0.6 });
  const my = useSpring(myRaw, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mxRaw.set(e.clientX / window.innerWidth);
      myRaw.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mxRaw, myRaw]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Colorful animated ink blobs (behind the frosted-glass UI) */}
      <Blob
        colorVar="--aurora-a"
        posClass="-left-[12%] -top-[14%] h-[68vh] w-[68vh]"
        animClass="animate-aurora-1"
        depth={60}
        delay={0.2}
        opacity={1}
        mx={mx}
        my={my}
      />
      <Blob
        colorVar="--aurora-b"
        posClass="right-[-14%] top-[2%] h-[64vh] w-[64vh]"
        animClass="animate-aurora-2"
        depth={-50}
        delay={0.5}
        opacity={0.95}
        mx={mx}
        my={my}
      />
      <Blob
        colorVar="--aurora-c"
        posClass="bottom-[-20%] left-[16%] h-[64vh] w-[64vh]"
        animClass="animate-aurora-3"
        depth={45}
        delay={0.8}
        opacity={0.9}
        mx={mx}
        my={my}
      />
      <Blob
        colorVar="--aurora-d"
        posClass="left-[40%] top-[30%] h-[52vh] w-[52vh]"
        animClass="animate-aurora-2"
        depth={-65}
        delay={1.1}
        opacity={0.8}
        mx={mx}
        my={my}
      />
      <Blob
        colorVar="--aurora-a"
        posClass="right-[20%] bottom-[6%] h-[44vh] w-[44vh]"
        animClass="animate-aurora-1"
        depth={70}
        delay={1.4}
        opacity={0.75}
        mx={mx}
        my={my}
      />

      {/* Faint dotted grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Light vignette — keeps text legible while letting the ink read strongly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/5 to-surface/55" />
    </div>
  );
}
