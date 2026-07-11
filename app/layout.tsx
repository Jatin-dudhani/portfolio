import type { Metadata } from "next";
import "./globals.css";

const BASE = "https://portfolio-jade-six-34.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Jatin Dudhani — Systems & Full-Stack Developer",
    template: "%s | Jatin Dudhani",
  },
  description:
    "Portfolio of Jatin Dudhani — CS undergrad building low-level systems (C++, DPI, networking) and full-stack apps (React, Next.js, Node.js). Aspiring DevOps / Cloud Engineer.",
  keywords: [
    "Jatin Dudhani",
    "Full-Stack Developer",
    "DevOps",
    "Cloud Engineer",
    "React",
    "Next.js",
    "C++",
    "DPI",
    "Portfolio",
  ],
  authors: [{ name: "Jatin Dudhani" }],
  openGraph: {
    title: "Jatin Dudhani — Systems & Full-Stack Developer",
    description:
      "CS undergrad building low-level systems (C++, DPI) and full-stack apps. Aspiring DevOps / Cloud Engineer.",
    url: BASE,
    siteName: "Jatin Dudhani",
    locale: "en_US",
    type: "website",
    images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Dudhani — Systems & Full-Stack Developer",
    description:
      "CS undergrad building low-level systems (C++, DPI) and full-stack apps. Aspiring DevOps / Cloud Engineer.",
    images: [`${BASE}/opengraph-image`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()
            `.replace(/\s+/g, " "),
          }}
        />
        <script
          defer
          data-domain="portfolio-jade-six-34.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
