import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="container-px border-t border-line/10 py-8">
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p className="font-mono">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js, Tailwind CSS &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
