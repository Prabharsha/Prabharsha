import { experience } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import Reveal from "./ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="container-px scroll-mt-24 py-24">
      <SectionHeading index="05" title="Experience" />

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute left-[7px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent/60 via-line/15 to-transparent sm:block" />

        <div className="flex flex-col gap-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="relative sm:pl-10">
                {/* Timeline node */}
                <span className="absolute left-0 top-3 hidden h-4 w-4 rounded-full border-2 border-accent bg-surface sm:block" />
                <GlassCard hover={false} className="p-6 sm:p-7">
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold">{job.company}</h3>
                    <span className="font-mono text-xs text-muted">
                      {job.meta}
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    {job.roles.map((role) => (
                      <div
                        key={role.title}
                        className="border-l-2 border-line/10 pl-4"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h4 className="font-medium text-accent">
                            {role.title}
                          </h4>
                          <span className="font-mono text-xs text-muted">
                            {role.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {role.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
