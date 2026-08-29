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
  // Replace public/resume.pdf with your real CV.
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
  roles: { title: string; period: string; detail: string }[];
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
      },
      {
        title: "Associate Software Engineer",
        period: "Apr 2024 to May 2025",
        detail:
          "Developed backend services and REST APIs with Spring Boot and RESTful web services.",
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
          "Back-end web development with Java, building and integrating payment-related services.",
      },
      {
        title: "Software Engineer Intern",
        period: "Nov 2022 to Apr 2023",
        detail:
          "Started in back-end web development with Java, contributing to core services remotely.",
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
