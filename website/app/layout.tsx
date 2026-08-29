import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Atmosphere from "@/components/Atmosphere";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = "https://prabharsha.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prabharsha | Fintech Software Engineer",
  description:
    "Prabharsha is a fintech software engineer in Colombo, Sri Lanka, building full-stack web and backend systems with Java, Spring, Next.js and TypeScript.",
  keywords: [
    "Prabharsha",
    "Software Engineer",
    "Fintech",
    "Full-stack developer",
    "Next.js",
    "Java",
    "Spring Boot",
    "Sri Lanka",
  ],
  authors: [{ name: "Prabharsha" }],
  openGraph: {
    title: "Prabharsha | Fintech Software Engineer",
    description:
      "Full-stack web & backend engineer building fintech and SaaS products.",
    url: siteUrl,
    siteName: "Prabharsha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabharsha | Fintech Software Engineer",
    description:
      "Full-stack web & backend engineer building fintech and SaaS products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}
    >
      <body className="font-sans antialiased">
        <Atmosphere />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
