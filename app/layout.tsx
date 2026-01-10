import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Karlo – Professioneller Cyr Wheel & Aerial Artist",
    template: "%s | Karlo",
  },
  description: "Karlo Janke – Professioneller Cyr Wheel & Aerial Artist für Events, Festivals und Theater. Spezialisiert auf zeitgenössische Zirkuskunst mit dynamischen Performances. Buchen Sie jetzt für Ihre Veranstaltung.",
  keywords: [
    "Karlo Janke",
    "Karlo",
    "Cyr Wheel Artist",
    "Aerial Straps",
    "Luftartist",
    "Aerial Artist",
    "Contemporary Circus",
    "Zeitgenössischer Zirkus",
    "Die Etage Berlin",
    "Zirkusartist",
    "Artistik",
    "Performance Artist",
    "Event Entertainment",
    "Corporate Events",
    "Festival Performer",
  ],
  authors: [{ name: "Karlo Janke" }],
  creator: "Karlo Janke",
  metadataBase: new URL("https://karlojanke.com"),
  openGraph: {
    type: "profile",
    locale: "de_DE",
    url: "https://karlojanke.com",
    title: "Karlo – Professioneller Cyr Wheel & Aerial Artist",
    description: "Karlo Janke – Professioneller Cyr Wheel & Aerial Artist. Fesselnde Performances für Events, Festivals und Theater. Buchen Sie jetzt Ihre maßgeschneiderte Artistik-Performance.",
    siteName: "Karlo Artist Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Karlo Janke bei einer Cyr Wheel Performance – Professioneller Zirkusartist in Aktion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karlo – Cyr Wheel & Aerial Artist",
    description: "Karlo Janke – Professioneller Cyr Wheel & Aerial Artist. Fesselnde Performances für Events, Festivals und Theater. Buchen Sie jetzt Ihre maßgeschneiderte Artistik-Performance.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/LogoSchwarz.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/LogoSchwarz.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className="antialiased font-sans">
        <LanguageProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Zum Hauptinhalt springen
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
