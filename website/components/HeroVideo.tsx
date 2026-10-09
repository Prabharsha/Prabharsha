"use client";

import { animate, utils } from "animejs";
import { useEffect, useRef } from "react";

import { EASE, observeInView, prefersReducedMotion } from "@/lib/motion";

const POSTER = "/videos/hero-coffee.jpg";

/**
 * The hero's looping clip. It holds a fixed position — the only motion is the
 * one-shot entrance anime.js plays on `shell` when it mounts.
 *
 * The clip is decorative, so it is muted, `aria-hidden`, and never becomes a
 * focus or reader target. It also only runs while it is actually on screen.
 */
export default function HeroVideo({ className }: { className?: string }) {
  const shell = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const box = shell.current;
    const vid = video.current;
    if (!box) return;

    const reduce = prefersReducedMotion();

    if (reduce) {
      utils.set(box, { opacity: 1, scale: 1, y: 0 });
    } else {
      animate(box, {
        opacity: [0, 1],
        scale: [0.94, 1],
        y: [24, 0],
        duration: 1100,
        delay: 260,
        ease: EASE,
      });
    }

    if (!vid) return;

    // Reduced motion gets the poster frame and no playback at all.
    if (reduce) {
      vid.removeAttribute("autoplay");
      vid.pause();
      return;
    }

    // Decoding frames for a clip that has scrolled away is pure battery burn,
    // so playback is tied to visibility.
    return observeInView(box, (inView) => {
      if (inView) {
        const p = vid.play();
        // Autoplay can still be refused (data saver, low power mode); the
        // poster stays up and nothing else needs to care.
        if (p) p.catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, []);

  return (
    <div
      ref={shell}
      aria-hidden
      className={`relative w-full min-w-0 opacity-0 ${className ?? ""}`}
    >
      {/* Ambient bloom: the poster itself, blown up and blurred out, so the
          light spilling behind the clip matches what is actually in it. Kept
          low at full width, where a stronger haze reads as grey fog rather
          than as spill. */}
      <div
        className="pointer-events-none absolute inset-[12%] -z-10 opacity-25 blur-3xl saturate-150"
        style={{
          backgroundImage: `url(${POSTER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Warm key light picked up from the sky palette. */}
      <div className="pointer-events-none absolute inset-x-[22%] inset-y-[8%] -z-10 rounded-full bg-accent/20 blur-3xl" />

      <video
        ref={video}
        className="hero-clip w-full"
        poster={POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      >
        <source src="/videos/hero-coffee.webm" type="video/webm" />
        <source src="/videos/hero-coffee.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
