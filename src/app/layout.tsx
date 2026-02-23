/** Корневой layout — метаданные, шрифты, JSON-LD и определение локали. */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://not-found.tech"),
  title: {
    default: "NotFound Studio — Web Development Agency",
    template: "%s | NotFound Studio",
  },
  description:
    "Fullstack development studio. We build web apps, Telegram Mini Apps, and digital products with React, Next.js, and TypeScript.",
  keywords: [
    "web development",
    "fullstack",
    "React",
    "Next.js",
    "TypeScript",
    "Telegram Mini App",
    "NestJS",
    "development agency",
    "веб-разработка",
    "студия разработки",
  ],
  authors: [{ name: "NotFound Studio", url: "https://not-found.tech" }],
  creator: "NotFound Studio",
  openGraph: {
    title: "NotFound Studio — Web Development Agency",
    description:
      "Fullstack development studio. Web apps, Telegram Mini Apps, digital products. Code, design, launch.",
    url: "https://not-found.tech",
    siteName: "NotFound Studio",
    locale: "en_US",
    alternateLocale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NotFound Studio",
    description:
      "Fullstack development studio. Web apps, Telegram Mini Apps, digital products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://not-found.tech",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("locale")?.value === "ru" ? "ru" : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NotFound Studio",
    url: "https://not-found.tech",
    email: "hello@not-found.tech",
    description:
      "Fullstack development studio. We build web apps, Telegram Mini Apps, and digital products.",
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Telegram Mini App Development",
      "Fullstack Development",
      "API Integration",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Telegram Mini Apps",
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
