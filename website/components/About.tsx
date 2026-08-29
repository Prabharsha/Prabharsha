import { MapPin, Code2, Rocket } from "lucide-react";
import { site, stats } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";

const facts = [
  { Icon: MapPin, label: "Location", value: site.location },
  { Icon: Code2, label: "Focus", value: site.focus },
  { Icon: Rocket, label: "Now building", value: site.building },
];

export default function About() {
  return (
    <section id="about" className="container-px scroll-mt-24 py-24">
      <SectionHeading index="02" title="About" />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal variant="left" className="lg:col-span-3">
          <GlassCard hover={false} className="h-full p-7 sm:p-9">
            <p className="text-lg leading-relaxed text-ink/90">{site.bio}</p>
            <p className="mt-4 leading-relaxed text-muted">
              I care about clean architecture, dependable APIs and interfaces
              that feel effortless. Outside of work I build side projects to
              learn new tools across the stack.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal variant="right" delay={0.1} className="lg:col-span-2">
          <div className="grid h-full gap-4">
            {facts.map(({ Icon, label, value }) => (
              <GlassCard
                key={label}
                className="flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                    {label}
                  </span>
                  <span className="block font-medium">{value}</span>
                </span>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Animated stats */}
      <Reveal variant="blur" delay={0.15} className="mt-5">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/[0.07] bg-line/[0.04] sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface/60 p-6 text-center transition-colors hover:bg-line/[0.04]"
            >
              <div className="text-3xl font-bold accent-gradient-text sm:text-4xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-muted sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
