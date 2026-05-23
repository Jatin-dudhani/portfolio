import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jatin Dudhani - Full-Stack Web Developer",
  description: "Portfolio of Jatin Dudhani, a full-stack web developer specializing in React, TypeScript, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#0e1116] text-[#f4efe7]">{children}</body>
    </html>
  );
}
