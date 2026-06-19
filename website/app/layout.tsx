import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Background from "@/components/Background";

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

const siteUrl = "https://prabharsha.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prabharsha — Fintech · Software Engineer",
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
    title: "Prabharsha — Fintech · Software Engineer",
    description:
      "Full-stack web & backend engineer building fintech and SaaS products.",
    url: siteUrl,
    siteName: "Prabharsha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabharsha — Fintech · Software Engineer",
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
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Background />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
