import type { Metadata } from "next";
import { Forum, Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "lenis/dist/lenis.css";

import Providers from "@/components/Providers";

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

const forum = Forum({
  subsets: ["latin"],
  variable: "--font-forum",
  weight: "400",
  display: "swap",
});

const siteUrl = "https://prabharsha.me";

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
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} ${forum.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
