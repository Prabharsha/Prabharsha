"use client";

import { createAnimatable, type AnimatableObject } from "animejs";
import { ArrowUpRight, Github, Lock, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/site";
import { EASE_FOLLOW, isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  const {
    title,
    description,
    tags,
    github,
    live,
    featured,
    private: isPrivate,
    label,
    span,
  } = project;

  const ref = useRef<HTMLElement>(null);
  const tilt = useRef<AnimatableObject | null>(null);

  // Interactive 3D tilt that follows the cursor.
  //
  // rotateX/rotateY/translateY all live on one animatable, so anime composes a
  // single transform per frame instead of the card fighting between a hover
  // lift and a tilt written separately. Pointer handlers do no interpolation of
  // their own — they just hand anime the latest target angles.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    // Wide cards tilt less, or their far edges swing too far.
    const max = featured || span === "lg" ? 4 : 7;
    const anim = createAnimatable(el, {
      rotateX: 420,
      rotateY: 420,
      y: 320,
      ease: EASE_FOLLOW,
    });
    tilt.current = anim;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      anim.rotateX(-py * max);
      anim.rotateY(px * max);
      anim.y(-4);
    };
    const onLeave = () => {
      anim.rotateX(0);
      anim.rotateY(0);
      anim.y(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      anim.revert();
      tilt.current = null;
    };
  }, [featured, span]);

  return (
    <article
      ref={ref}
      style={{ perspective: 900 }}
      className={`glass glass-hover group relative flex h-full flex-col rounded-2xl p-6 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {featured ? (
            <Star className="h-4 w-4 fill-accent text-accent" />
          ) : null}
          <h3
            className={
              featured
                ? "font-display text-3xl font-light"
                : "text-lg font-semibold"
            }
          >
            {title}
          </h3>
        </div>
        {(label || isPrivate) && (
          <span className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
            {isPrivate ? <Lock className="h-3 w-3" /> : null}
            {label ?? (isPrivate ? "Private" : "")}
          </span>
        )}
      </div>

      <p
        className={`text-muted ${
          featured ? "max-w-2xl text-base" : "text-sm"
        }`}
      >
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-line/[0.05] px-2 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-6">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        ) : null}
        {live ? (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowUpRight className="h-4 w-4" />
            Live
          </a>
        ) : null}
        {!github && !live ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted/70">
            <Lock className="h-3.5 w-3.5" />
            Private repository
          </span>
        ) : null}
      </div>
    </article>
  );
}
