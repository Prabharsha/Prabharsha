"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Github, Lock, Star } from "lucide-react";
import type { Project } from "@/data/site";

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
  } = project;

  // Interactive 3D tilt that follows the cursor.
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const max = featured ? 4 : 7;
    rx.set(-py * max);
    ry.set(px * max);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ y: -4 }}
      style={{ transform }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
    </motion.article>
  );
}
