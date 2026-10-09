"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { caseStudyTitles } from "@/data/caseStudies";
import { projects as allProjects, site, type Project } from "@/data/site";
import { scrollToY } from "@/lib/smooth";

import CaseStudies from "./CaseStudies";

// Projects with real captures get full case studies above; the rest go in the pinned list.
const projects = allProjects.filter((p) => !caseStudyTitles.has(p.title));

function projectLink(project: Project) {
  if (project.github) return { href: project.github, label: "Explore the code", external: true };
  if (project.live) return { href: project.live, label: "Visit the live site", external: true };
  return { href: `mailto:${site.email}?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`, label: `Let’s talk about ${project.title}`, external: false };
}

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * "Selected work" panel, modelled on the reference's curved accent panel.
 * Desktop with motion: the list + card pin centred on screen, scroll steps through the project list on
 * the left and the window card on the right swaps to match. Phones and reduced
 * motion get every card stacked as a plain list.
 */
export default function WorkShowcase() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      el.classList.add("is-pinned");
      const header = document.querySelector<HTMLElement>(".site-header");
      const st = ScrollTrigger.create({
        // Pin the list + card only, once the whole card sits centred in the
        // space under the header; the title scrolls away first.
        trigger: el.querySelector(".work-grid"),
        start: () => {
          const h = header?.offsetHeight ?? 80;
          return `center ${h + (innerHeight - h) / 2}px`;
        },
        end: () => `+=${projects.length * innerHeight * 0.38}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setActive(Math.min(projects.length - 1, Math.floor(self.progress * projects.length))),
      });
      trigger.current = st;
      return () => { el.classList.remove("is-pinned"); trigger.current = null; setActive(0); };
    });
    return () => mm.revert();
  }, []);

  // Clicking a name scrolls to the point in the pin where that project shows.
  const jump = (index: number) => {
    const st = trigger.current;
    if (!st) { setActive(index); return; }
    const y = st.start + ((index + 0.5) / projects.length) * (st.end - st.start);
    scrollToY(y);
  };

  return (
    <section id="work" ref={root} className="work-panel" aria-labelledby="work-heading">
      <div className="work-stage">
        <div className="drift" aria-hidden="true"><i /><i /></div>
        <div className="wrap work-inner">
          <h2 id="work-heading" className="work-title">Less talk. <em>More building.</em></h2>
          <CaseStudies />
          <div className="work-more-head">
            <h3>More projects</h3>
            <p>Products, client work and experiments across the stack.</p>
          </div>
          <div className="work-grid">
            <ol className="work-list" aria-label="Projects">
              {projects.map((project, index) => (
                <li key={project.title}>
                  <button type="button" aria-current={active === index ? "true" : undefined} aria-controls={`project-${slug(project.title)}`} onClick={() => jump(index)}>
                    <strong>{project.title}</strong>
                    <span>{project.label || project.tags.slice(0, 2).join(" · ")}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="work-cards">
              {projects.map((project, index) => {
                const link = projectLink(project);
                return (
                  <article key={project.title} id={`project-${slug(project.title)}`} className={`work-window ${active === index ? "is-active" : ""}`}>
                    <div className="work-chrome" aria-hidden="true"><i /><i /><i /><span>~/projects/{slug(project.title)}</span></div>
                    <div className="work-body">
                      <p className="work-kind">{project.private ? "Currently building · Private repository" : project.label || "Personal project"}</p>
                      <h3>{project.title}<span>.</span></h3>
                      <p className="work-desc">{project.description}</p>
                      <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                      <a className="pill-link" href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label} <ArrowUpRight size={16} /></a>
                    </div>
                    <span className="work-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div className="work-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
