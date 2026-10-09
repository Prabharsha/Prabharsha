import {
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiSpring,
  SiNodedotjs,
  SiExpress,
  SiNginx,
  SiMongodb,
  SiMysql,
  SiGit,
  SiPostman,
  SiLinux,
  SiVercel,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiFlutter,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";
import type { IconType } from "react-icons";

export const site = {
  name: "Prabharsha",
  role: "Fintech · Software Engineer",
  // Short, animated taglines rotated in the hero
  taglines: [
    "I build full-stack web & backend systems.",
    "Crafting fintech & SaaS products.",
    "Java · Spring · Next.js · TypeScript",
  ],
  // NOTE: refine this bio anytime; it stays honest to the real profile.
  bio: "I'm a software engineer at PayMedia in Colombo, Sri Lanka, building reliable fintech and payment systems. I work across the stack, from server-side services with Java & Spring Boot to modern web frontends with Next.js & TypeScript, with a focus on shipping clean, maintainable products.",
  location: "Colombo, Sri Lanka",
  focus: "Full-stack web & backend",
  building: "ClickSuite, a booking SaaS",
  email: "prabharsha03@gmail.com",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/Prabharsha",
    linkedin: "https://www.linkedin.com/in/prabharsha/",
    email: "mailto:prabharsha03@gmail.com",
  },
};

export type SkillGroup = {
  label: string;
  secondary?: boolean;
  note?: string;
  items: { name: string; Icon: IconType; color: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Java", Icon: FaJava, color: "#f89820" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#61dafb" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Redux", Icon: SiRedux, color: "#764abc" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", Icon: SiCss, color: "#1572b6" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Spring", Icon: SiSpring, color: "#6db33f" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Express", Icon: SiExpress, color: "#ffffff" },
      { name: "Nginx", Icon: SiNginx, color: "#009639" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
      { name: "Oracle", Icon: FaDatabase, color: "#f80000" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Git", Icon: SiGit, color: "#f05032" },
      { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
      { name: "Linux", Icon: SiLinux, color: "#fcc624" },
      { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
    ],
  },
  {
    label: "Also exploring",
    secondary: true,
    note: "Personal / learning projects, not professional focus.",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776ab" },
      { name: "Flutter", Icon: SiFlutter, color: "#02569b" },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  private?: boolean;
  label?: string;
  // bento span hints (lg grid)
  span?: "lg" | "md" | "sm";
};

export const projects: Project[] = [
  {
    title: "ClickSuite",
    description:
      "A premium booking & studio-management SaaS for photographers, videographers and creative studios: scheduling, client management and media workflows in one place.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SaaS"],
    featured: true,
    private: true,
    label: "Flagship",
    span: "lg",
  },
  {
    title: "Mathy Surf Coach",
    description:
      "A live marketing site for a surf school in Weligama, Sri Lanka: lessons and packages, an interactive surf-spot map, gallery, reviews and FAQ, with bookings going straight to WhatsApp.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Google Maps", "Cloudflare"],
    live: "https://mathysurfcoach.com",
    label: "Client work",
    span: "lg",
  },
  {
    title: "Event.Book",
    description:
      "An event booking application exploring a modern full-stack setup with App Router, server actions and a document database.",
    tags: ["Next.js 14", "Tailwind", "MongoDB", "Node.js"],
    github: "https://github.com/Prabharsha/Event.Book",
    span: "md",
  },
  {
    title: "TrainParcelAdvisor SL",
    description:
      "A full-stack parcel-management & ticket-booking system for Sri Lanka Railways: Java/Spring backend, TypeScript web app, plus a FastAPI service that predicts parcel travel time.",
    tags: ["Java", "Spring", "TypeScript", "Python", "FastAPI"],
    github: "https://github.com/Prabharsha/TrainParcelAdvisor-SL",
    span: "md",
  },
  {
    title: "upload-it",
    description:
      "A cloud storage service for uploading, organising and sharing files, deployed on Vercel.",
    tags: ["Next.js", "TypeScript", "Vercel"],
    github: "https://github.com/Prabharsha/upload-it",
    span: "sm",
  },
  {
    title: "Pahana Edu Billing",
    description:
      "A web-based billing and customer-management system for a Colombo bookshop, with authentication, item management and invoice calculation.",
    tags: ["Java", "Web", "Billing"],
    github: "https://github.com/Prabharsha/pahana-edu-billing-system",
    span: "sm",
  },
  {
    title: "Ocean View Resort",
    description:
      "A room reservation and resort-management system built with Java EE.",
    tags: ["Java EE", "Reservations"],
    github: "https://github.com/Prabharsha/ocean-view-resort-web",
    span: "sm",
  },
  {
    title: "RideLedger",
    description:
      "A Flutter app for motorcycle service records, ride summaries, fuel tracking and maintenance reminders with exportable history.",
    tags: ["Flutter", "Dart", "Mobile"],
    github: "https://github.com/Prabharsha/rideledger-mobile",
    label: "Personal / hobby",
    span: "md",
  },
];

export type Job = {
  company: string;
  meta: string;
  roles: { title: string; period: string; detail: string; highlights?: string[]; tags?: string[] }[];
};

export const experience: Job[] = [
  {
    company: "PayMedia",
    meta: "Colombo, Sri Lanka · On-site · 2 yrs 3 mos",
    roles: [
      {
        title: "Software Engineer",
        period: "May 2025 to Present",
        detail:
          "Building and maintaining fintech products across server-side services and front-end development.",
        highlights: [
          "Leading development for a dedicated client while running several projects in parallel.",
          "Implementing role-based access control (RBAC) so each user only sees and does what their role allows.",
          "Building merchant-facing APIs that power the merchant app.",
          "Standardising admin-panel forms and moving uniqueness checks to the first request, with clear field-level errors.",
          "Administering production Linux (RHEL) servers that run the services.",
        ],
        tags: ["Java", "Spring Boot", "React", "Next.js", "RHEL"],
      },
      {
        title: "Associate Software Engineer",
        period: "Apr 2024 to May 2025",
        detail:
          "Full-stack enhancements for banking platforms, from Spring Boot APIs to the web portals operations teams use.",
        highlights: [
          "Built and maintained REST APIs, service-level validation and business logic for banking workflows.",
          "Improved operational web portals with React, Next.js and TypeScript.",
          "Traced production bugs through server logs, failed transactions and API response mismatches.",
          "Coordinated integrations between financial applications, banking services and external providers.",
          "Took part in code reviews, UAT support and release coordination.",
        ],
        tags: ["Java", "Spring Boot", "REST APIs", "React", "Next.js"],
      },
    ],
  },
  {
    company: "DirectPay",
    meta: "Sri Lanka · 1 yr 6 mos",
    roles: [
      {
        title: "Associate Software Engineer",
        period: "May 2023 to Apr 2024",
        detail:
          "Backend and web features for fintech and digital banking platforms.",
        highlights: [
          "Built customer-facing web features and the backend improvements behind banking workflows.",
          "Worked across APIs, databases and front-end components to ship complete features.",
          "Fixed defects quickly and validated service behaviour across testing and production.",
        ],
        tags: ["Java", "REST APIs", "SQL", "Payments"],
      },
      {
        title: "Software Engineer Intern",
        period: "Nov 2022 to Apr 2023",
        detail:
          "Started on fintech and digital banking web applications, working remotely.",
        highlights: [
          "Helped build production-ready features for fintech and digital banking web apps.",
          "Supported backend and front-end tasks across APIs, database operations and app logic.",
        ],
        tags: ["Java", "APIs", "SQL", "Remote"],
      },
    ],
  },
];

export type Stat = { label: string; value: number; suffix: string };

export const stats: Stat[] = [
  { label: "Years building software", value: 3, suffix: "+" },
  { label: "Projects shipped", value: 20, suffix: "+" },
  { label: "Technologies used", value: 15, suffix: "+" },
  { label: "Fintech companies", value: 2, suffix: "" },
];

export type Service = {
  key: "fullstack" | "backend" | "fintech" | "saas";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    key: "fullstack",
    title: "Full-Stack Web",
    description:
      "End-to-end web apps with Next.js, React & TypeScript, from UI to data layer, responsive and fast.",
  },
  {
    key: "backend",
    title: "Backend & APIs",
    description:
      "Robust services and REST APIs with Java & Spring Boot, designed for reliability and clean integration.",
  },
  {
    key: "fintech",
    title: "Fintech Systems",
    description:
      "Payment-domain software built with care for correctness, security and the details that matter in money.",
  },
  {
    key: "saas",
    title: "SaaS Products",
    description:
      "Shipping product-grade SaaS like ClickSuite: auth, dashboards, billing flows and polished UX.",
  },
];

export const navLinks = [
  { href: "#about", label: "about" },
  { href: "#services", label: "services" },
  { href: "#skills", label: "skills" },
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export type Recommendation = {
  name: string;
  title: string;
  relation: string;
  date: string;
  /** Quoted verbatim from LinkedIn. */
  paragraphs: string[];
};

export const recommendationsUrl = "https://www.linkedin.com/in/prabharsha/details/recommendations/";

export const recommendations: Recommendation[] = [
  {
    name: "Dr. Amal Illesinghe",
    title: "Retired CIO at National Savings Bank",
    relation: "Client",
    date: "June 2025",
    paragraphs: [
      "I had the opportunity to work closely with Prabharsha during his time as the primary developer for NSB’s Internet Banking (IB) and Mobile Banking (MB) applications. He was a key contributor to the maintenance and enhancement of these platforms, consistently handling live issues with efficiency and professionalism.",
      "One of his major contributions was the successful integration of LPOPP into the IB and MB platforms — a complex task that he executed seamlessly. Additionally, during NSB’s core banking system migration from the legacy platform to T24, Prabharsha played a critical role in updating and adapting both the IB/MB and CEFT applications. His deep understanding of the systems and ability to deliver under pressure were instrumental to the project’s success.",
      "He’s not only technically strong but also dependable, solution-oriented, and a team player — a true asset to any tech team. Thereby I would certify this recommendation for Prabharsha as professionally software development asset",
    ],
  },
  {
    name: "Dilun Panduka",
    title: "Associate Team Lead at PayMedia",
    relation: "Senior colleague",
    date: "September 2025",
    paragraphs: [
      "I’ve had the pleasure of working closely with Pansilu, and I can confidently say that they are one of the most well-rounded and technically proficient full stack developers I’ve met. Their expertise spans across web(NextJs, SpringThymleaf) and backend, making them an invaluable asset to any tech team.",
      "What truly sets Pansilu apart is not just their hands-on development skills, but also their deep understanding of computer science fundamentals and software architecture. Whether it’s designing robust monolithic systems or orchestrating scalable microservices, Pansilu approaches each challenge with clarity and precision.",
      "They’re also highly capable when it comes to deployment—skilled in cloud platforms as well as on-premises infrastructures, ensuring reliable and secure delivery pipelines across environments.",
      "Pansilu is a rare blend of a strong theoretical foundation and practical execution. If you’re looking for someone who can architect, build, and deploy modern software solutions end-to-end, I would highly recommend Pansilu without hesitation.",
    ],
  },
  {
    name: "Chamith Kodikara",
    title: "Tech Leader & Java Specialist",
    relation: "Managed me directly",
    date: "June 2025",
    paragraphs: [
      "I had the pleasure of working with Pansilu, He contributed to a Spring Boot-based microservices project that I directly managed. From day one, Pansilu demonstrated strong technical skills, a solid understanding of Java, and a proactive attitude toward learning and problem-solving.",
      "What impressed me most was his ability to grasp complex concepts quickly and apply them effectively in real development scenarios. He showed great attention to detail, wrote clean and efficient code, and was always open to feedback. They collaborated well with the team, communicated clearly, and took full ownership of assigned tasks.",
      "I highly recommend Pansilu for any opportunity that values a technically capable, dedicated, and growth-oriented developer. With continued mentorship and experience, I’m confident he will become a valuable asset to any development team.",
    ],
  },
];
