/**
 * Featured case studies (projects with real captures). Facts come from the
 * live site / repository; screenshots live in public/images/projects.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  link: { href: string; label: string };
  secondaryLink?: { href: string; label: string };
  tags: string[];
  /** Short numbered phases or feature blocks. */
  blocks: { title: string; text: string }[];
  /** Highlighted checklist (e.g. SEO work) shown as chips. */
  checklist?: { title: string; items: string[] };
  stats?: { value: string; label: string }[];
  /** Full-width row that features the screens worth a closer look. */
  spotlight?: { title: string; text: string; points: string[]; screens: { src: string; alt: string }[] };
  media:
    | { kind: "site"; url: string; page: string; peek: string; peekAlt: string; badges: string[] }
    | { kind: "phones"; screens: { src: string; alt: string }[]; badges: string[] };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mathy-surf-coach",
    title: "Mathy Surf Coach",
    kicker: "Client work · Live business site",
    summary:
      "A local surf coach in Weligama needed a home online. I built his business site from scratch: a fast, story-led site that turns visitors into WhatsApp bookings and helps travellers find him on Google.",
    link: { href: "https://mathysurfcoach.com", label: "Visit the live site" },
    tags: ["React", "Vite", "Tailwind CSS", "Leaflet", "Cloudflare"],
    blocks: [
      {
        title: "Discover",
        text: "Mapped what travellers ask before they book (level, price, spot, safety, what to bring) and shaped every section around those answers.",
      },
      {
        title: "Design & build",
        text: "A calm, ocean-toned site: lessons by level, six priced packages, a Weligama bay gallery, an interactive map of seven south-coast surf spots and a ten-question FAQ.",
      },
      {
        title: "Convert",
        text: "No booking forms to abandon: every call to action opens WhatsApp with a ready-written message, plus a one-tap call link and opening hours on screen.",
      },
      {
        title: "Grow the footprint",
        text: "Set up the search and social foundations a local business needs, and a review loop that asks happy surfers to leave a Google review.",
      },
    ],
    checklist: {
      title: "Digital footprint & SEO",
      items: [
        "LocalBusiness structured data (schema.org)",
        "Services, prices & opening hours in search data",
        "Geo location + 5 towns served",
        "Open Graph social share card",
        "Canonical URL & XML sitemap",
        "Search-ready title & meta description",
        "Responsive WebP images, lazy-loaded",
        "Google review prompts",
        "Linked Instagram & Facebook profiles",
        "Cloudflare hosting & analytics",
      ],
    },
    media: {
      kind: "site",
      url: "mathysurfcoach.com",
      page: "/images/projects/mathy-page.webp",
      peek: "/images/projects/mathy-map.webp",
      peekAlt: "Interactive map of seven surf spots on Sri Lanka's south coast",
      badges: ["LocalBusiness schema", "WhatsApp booking", "Open Graph card", "Sitemap"],
    },
  },
  {
    slug: "rideledger",
    title: "RideLedger",
    kicker: "Personal product · Flutter app",
    summary:
      "My rebuilt 2017 Yamaha TW200 needed a careful engine break-in, and Sri Lanka's weekly fuel quota meant every litre counted. So I built the app I wanted: a riding dashboard that coaches the break-in, tracks fuel and keeps the bike's whole history, entirely offline.",
    link: { href: "https://github.com/Prabharsha/rideledger-mobile", label: "Explore the code" },
    tags: ["Flutter", "Dart", "Riverpod", "Isar", "GoRouter", "flutter_map", "fl_chart"],
    blocks: [
      { title: "Live ride dashboard", text: "Big speed readout, RPM band, gear and stage limits, with voice alerts when you push past the break-in limit." },
      { title: "Break-in planner", text: "Staged engine break-in with speed and throttle guidance per stage and a per-gear speed table." },
      { title: "Fuel tracker", text: "Weekly quota, refuel log, economy and estimated range, so you know what is left before you ride." },
      { title: "Ride history", text: "Every ride with distance, duration, average speed, fuel used, speed profile and warnings." },
      { title: "Maintenance", text: "Odometer-based reminders such as oil changes and chain lube, with progress bars." },
      { title: "Reports & export", text: "PDF, CSV and JSON exports of rides, fuel, service records and break-in compliance." },
    ],
    stats: [
      { value: "100%", label: "Offline, on-device data" },
      { value: "94", label: "Dart source files" },
      { value: "4", label: "Guided break-in stages" },
      { value: "3", label: "Export formats" },
    ],
    spotlight: {
      title: "Every ride, replayed.",
      text: "After each ride, RideLedger rebuilds the trip from GPS: a speed trace drawn against the break-in limit, and every warning pinned to the exact spot on the route where it happened.",
      points: [
        "Distance, duration, speeds and fuel at a glance",
        "Speed trace with the break-in limit drawn across it",
        "Each overspeed with time, speed and GPS position",
        "Tap a warning to centre the map on that moment",
      ],
      screens: [
        { src: "/images/projects/rideledger-trip-summary.webp", alt: "Trip detail: distance, duration, average and max speed, fuel used, a speed profile chart with the 40 km/h limit line, and the route map with warning markers" },
        { src: "/images/projects/rideledger-trip-events.webp", alt: "Trip events: route map centred on an overspeed marker, above a timeline of overspeed warnings with time, speed and coordinates" },
      ],
    },
    media: {
      kind: "phones",
      screens: [
        { src: "/images/projects/rideledger-live.webp", alt: "Live ride screen showing speed, RPM band and break-in stage" },
        { src: "/images/projects/rideledger-home.webp", alt: "Home dashboard with today's rides, fuel and service reminders" },
        { src: "/images/projects/rideledger-breakin.webp", alt: "Break-in planner with stage progress and throttle guidance" },
        { src: "/images/projects/rideledger-history.webp", alt: "Ride history list with distance, duration and speed" },
        { src: "/images/projects/rideledger-reports.webp", alt: "Reports and export screen with PDF, CSV and JSON options" },
        { src: "/images/projects/rideledger-maintenance.webp", alt: "Maintenance reminders with progress toward each service" },
        { src: "/images/projects/rideledger-gears.webp", alt: "Per-gear speed table for each break-in stage" },
      ],
      badges: ["Offline-first · Isar", "Voice alerts", "GPS ride tracking", "PDF · CSV · JSON"],
    },
  },
];

export const caseStudyTitles = new Set(caseStudies.map((c) => c.title));
