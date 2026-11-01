import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APPISTRY — The Hidden Key | Code Mystery Hunt",
  description:
    "THE HIDDEN KEY: A Code Mystery Hunt organized by APPISTRY — App Development Club, STC IIT Patna Hybrid. Dive into the source. Find what lies beneath.",
  keywords: ["APPISTRY", "STC IIT Patna", "Hidden Key", "Code Mystery Hunt", "Hackathon", "App Development"],
  authors: [{ name: "APPISTRY — App Development Club" }],
  openGraph: {
    title: "APPISTRY — The Hidden Key",
    description: "A Code Mystery Hunt. Dive into the source. Find what lies beneath.",
    type: "website",
  },
  icons: {
    icon: '/images/appistry-logo.png',
    shortcut: '/images/appistry-logo.png',
    apple: '/images/appistry-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-bg" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
