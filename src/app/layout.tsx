import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prince Varti | Senior Software Engineer | AI/UI Engineer",
  description:
    "Portfolio of Prince Varti, Senior Software Engineer | AI/UI Engineer with 7.5+ years building intelligent, enterprise-grade systems with React, Node.js, Python, FastAPI, and Agentic AI/LLM integration.",
  keywords: [
    "Prince Varti",
    "Senior Software Engineer",
    "AI/UI Engineer",
    "Agentic AI",
    "React",
    "Next.js",
    "FastAPI",
    "Python",
    "RAG",
    "Portfolio",
    "LLM",
  ],
  openGraph: {
    title: "Prince Varti | Senior Software Engineer | AI/UI Engineer",
    description:
      "Building Intelligent, Enterprise Systems & Agentic AI Workflows. 7.5+ Years Experience.",
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
