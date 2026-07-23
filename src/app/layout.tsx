import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prince Varti | Senior Frontend Engineer — Portfolio",
  description:
    "Portfolio of Prince Varti, Senior Frontend Engineer with 7.5+ years building intelligent, enterprise-grade systems with React, Next.js, and LLM integration.",
  keywords: [
    "Prince Varti",
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "Portfolio",
    "LLM",
    "AI",
  ],
  openGraph: {
    title: "Prince Varti | Senior Frontend Engineer",
    description:
      "Building Intelligent, Enterprise Systems. 7.5+ Years Experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body
        className="min-h-screen"
        style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
