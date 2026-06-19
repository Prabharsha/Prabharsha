import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="container-px scroll-mt-24 py-24">
      <SectionHeading index="06" title="Contact" />

      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-accent/30 blur-[100px]" />
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something.
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            I&apos;m always open to interesting projects, fintech work and good
            conversations. Drop me a line and I&apos;ll get back to you.
          </p>

          <a
            href={site.socials.email}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-[#04141a] transition-transform hover:scale-[1.03]"
          >
            {site.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-8 flex items-center justify-center gap-5">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-accent"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={site.socials.email}
              aria-label="Email"
              className="text-muted transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
