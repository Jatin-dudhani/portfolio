import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jatin Dudhani — Systems & Full-Stack Developer",
  description: "Portfolio of Jatin Dudhani — CS undergrad building low-level systems (C++, DPI, networking) and full-stack apps (React, Next.js, Node.js).",
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
            `.replace(/\s+/g, ' '),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
