import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        <script async src="https://plausible.io/js/pa-n21_3K1_J3Rf5Z7w_WNJJ.js" />
        <script dangerouslySetInnerHTML={{
          __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jatin Dudhani',
              jobTitle: 'Systems & Full-Stack Developer',
              url: BASE,
              sameAs: [
                'https://github.com/Jatin-dudhani',
                'https://www.linkedin.com/in/jatin-dudhani-057664254/',
              ],
              alumnusOf: {
                '@type': 'CollegeOrUniversity',
                name: 'The LNM Institute of Information Technology',
              },
              knowsAbout: [
                'Systems Programming',
                'Full-Stack Web Development',
                'DevOps',
                'Cloud Computing',
                'Deep Packet Inspection',
                'C++',
                'Next.js',
                'React',
                'TypeScript',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
