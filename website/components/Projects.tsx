import { projects } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import ProjectCard from "./ProjectCard";

const spanClass: Record<string, string> = {
  lg: "sm:col-span-2 lg:col-span-3",
  md: "lg:col-span-1 sm:col-span-1",
  sm: "",
};

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        index="04"
        title="Selected work"
        subtitle="A mix of professional and personal projects — fintech, full-stack web and a couple of things I built to learn."
      />

      {featured ? (
        <Reveal className="mb-5">
          <ProjectCard project={featured} />
        </Reveal>
      ) : null}

      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal
            key={project.title}
            delay={(i % 3) * 0.06}
            className={spanClass[project.span ?? "sm"]}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
