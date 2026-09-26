import { projects } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import ProjectCard from "./ProjectCard";

const spanClass: Record<string, string> = {
  md: "lg:col-span-1 sm:col-span-1",
  sm: "",
};

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  // Full-width cards sit above the grid so they don't stretch to the
  // equal-height (auto-rows-fr) rows of the smaller cards.
  const wide = projects.filter((p) => !p.featured && p.span === "lg");
  const rest = projects.filter((p) => !p.featured && p.span !== "lg");

  return (
    <section id="work" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        index="05"
        title="Selected work"
        subtitle="A mix of professional, client and personal projects across fintech, full-stack web and a couple of things I built to learn."
      />

      {featured ? (
        <Reveal variant="blur" className="mb-5">
          <ProjectCard project={featured} />
        </Reveal>
      ) : null}

      {wide.map((project) => (
        <Reveal key={project.title} variant="rise" className="mb-5">
          <ProjectCard project={project} />
        </Reveal>
      ))}

      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal
            key={project.title}
            variant="rise"
            delay={(i % 3) * 0.08}
            className={spanClass[project.span ?? "sm"]}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
