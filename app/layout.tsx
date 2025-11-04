import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Karlo",
    template: "%s | Karlo",
  },
  description: "Eine hochwertige Next.js Anwendung mit elegantem Design",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Karlo Team" }],
  creator: "Karlo",
  metadataBase: new URL("https://karlo.example.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://karlo.example.com",
    title: "Karlo",
    description: "Eine hochwertige Next.js Anwendung mit elegantem Design",
    siteName: "Karlo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karlo",
    description: "Eine hochwertige Next.js Anwendung mit elegantem Design",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
