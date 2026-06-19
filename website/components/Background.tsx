export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Aurora blobs */}
      <div
        className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vh] rounded-full bg-accent/30 blur-[120px] animate-aurora-1"
        style={{ opacity: "var(--aurora-opacity)" }}
      />
      <div
        className="absolute right-[-10%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-violet-glow/30 blur-[130px] animate-aurora-2"
        style={{ opacity: "var(--aurora-opacity)" }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] h-[45vh] w-[45vh] rounded-full bg-accent-deep/25 blur-[140px] animate-aurora-3"
        style={{ opacity: "var(--aurora-opacity)" }}
      />

      {/* Faint dotted grid / code motif */}
      <div className="bg-grid absolute inset-0" />

      {/* Top & bottom vignette to keep text legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/80" />
    </div>
  );
}
