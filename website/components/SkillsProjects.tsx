"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ArrowDown, Code2 } from "lucide-react";
import { projects, skillGroups, site } from "@/data/site";

const categories = ["All projects", "Web & SaaS", "Backend & Java", "Mobile"];
const descriptions = [
  "The languages I use to turn an idea into working software.",
  "Responsive interfaces, connected to the systems behind them.",
  "Services and APIs built for dependable integration.",
  "The data layer behind full-stack products and payment systems.",
  "The tools I use to build, test, deploy and maintain software.",
  "Personal experiments that keep me learning beyond my day-to-day stack.",
];

export default function SkillsProjects() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [category, setCategory] = useState("All projects");
  const group = skillGroups[groupIndex];
  const visible = projects.filter(project => {
    if (category === "Web & SaaS") return project.tags.some(tag => /Next|SaaS|Tailwind/.test(tag));
    if (category === "Backend & Java") return project.tags.some(tag => /Java|Spring|FastAPI/.test(tag));
    if (category === "Mobile") return project.tags.includes("Mobile");
    return true;
  });

  return <>
    <section id="skills" className="skills-lab wrap section-space" aria-labelledby="skills-heading">
      <div className="lab-heading"><h2 id="skills-heading">The stack.<br /><em>The possibilities.</em></h2><p>From the interface to the API.<br />Explore the tools I build with.</p></div>
      <div className="skill-workbench">
        <div className="skill-selectors" role="group" aria-label="Explore skill categories">{skillGroups.map((item, index) => <button key={item.label} type="button" aria-pressed={groupIndex === index} aria-controls="skill-stage" onClick={() => setGroupIndex(index)}><span>{item.label}</span><ArrowUpRight size={18} /></button>)}</div>
        <div id="skill-stage" className="skill-stage" aria-live="polite" aria-atomic="true">
          <div key={group.label} className="skill-stage-content"><div className="skill-stage-title"><h3>{group.label}</h3><Code2 size={28} aria-hidden="true" /></div><p>{descriptions[groupIndex]}</p>
            <ul className="technology-cloud" aria-label={`${group.label} technologies`}>{group.items.map(({ name, Icon }, index) => <li key={name} style={{ "--item-delay": `${index * 35}ms` } as CSSProperties}><Icon aria-hidden="true" /><span>{name}</span></li>)}</ul>
            {group.note && <small>{group.note}</small>}
            <a href="#work" className="text-link">See the stack in action <ArrowDown size={17} /></a>
          </div>
        </div>
      </div>
    </section>
    <section id="work" className="work-section" aria-labelledby="work-heading"><div className="wrap section-space">
      <div className="section-top"><h2 id="work-heading">Less talk.<br /><em>More building.</em></h2><p>Explore the projects behind the skills.<br />Full-stack products, backend systems and experiments.</p></div>
      <div className="project-filter" role="group" aria-label="Filter projects">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="project-gallery" onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p className="project-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"} · {category}</p>
      <div id="project-gallery" className="project-gallery" key={category}>{visible.map((project, index) => <article className={`work-card ${project.featured ? "work-card-featured" : ""}`} key={project.title} style={{ "--item-delay": `${index * 45}ms` } as CSSProperties}>
        <div className="work-card-top"><h3>{project.title}<span>.</span></h3><Code2 size={22} aria-hidden="true" /></div>
        <span className="work-kind">{project.private ? "Currently building · Private repository" : project.label || project.tags.slice(0, 2).join(" / ")}</span>
        <p>{project.description}</p><ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <a className="text-link" href={project.github || `mailto:${site.email}?subject=Tell%20me%20about%20ClickSuite`} {...(project.github ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{project.github ? "Explore the code" : "Let’s talk about ClickSuite"}<ArrowUpRight size={18} /></a>
      </article>)}</div>
    </div></section>
  </>;
}
