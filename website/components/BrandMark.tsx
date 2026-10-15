/**
 * The site mark: the wordmark's "p" with its lime full stop on a teal tile.
 * Same drawing as app/icon.svg (the favicon), inlined so it sits in the header.
 */
export default function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="brand-mark-bg" cx="38%" cy="28%" r="85%">
          <stop offset="0" stopColor="#00707e" />
          <stop offset=".55" stopColor="#00545f" />
          <stop offset="1" stopColor="#001e23" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#brand-mark-bg)" />
      <g fill="#fff">
        <rect x="8.6" y="9.4" width="3.4" height="16" />
        <rect x="6.8" y="24.6" width="7.4" height="1.5" rx=".4" />
        <rect x="7.1" y="9.4" width="4.9" height="1.4" rx=".4" />
      </g>
      <circle cx="16.8" cy="15.6" r="5.3" fill="none" stroke="#fff" strokeWidth="3.1" />
      <circle className="brand-mark-dot" cx="26.2" cy="20.4" r="2.2" fill="#d6fb00" />
    </svg>
  );
}
