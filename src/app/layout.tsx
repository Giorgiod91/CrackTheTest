import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import ConsentBanner from "./_components/ConsentBanner";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "AP1 Prüfungsvorbereitung Fachinformatiker | AP1 Ready",
    template: "%s | AP1 Ready",
  },
  description:
    "AP1 Prüfungsvorbereitung für Fachinformatiker (IHK): alle Prüfungsthemen mit Rechenwegen und Prüfungstipps, Fortschritt pro Thema, Notenprognose und 90-Minuten-Prüfungssimulation. 15 € einmalig, kein Abo.",
  keywords: [
    "AP1 Prüfungsvorbereitung",
    "Prüfungsvorbereitung Fachinformatiker",
    "IHK Prüfungsvorbereitung Fachinformatiker",
    "AP1 Fachinformatiker",
    "AP1 Fachinformatiker Anwendungsentwicklung",
    "AP1 Fachinformatiker Systemintegration",
    "Einrichten eines IT-gestützten Arbeitsplatzes",
    "AP1 Übungsaufgaben",
    "AP1 Subnetting",
    "Abschlussprüfung Teil 1 Fachinformatiker",
  ],
  openGraph: {
    title: "AP1 Prüfungsvorbereitung Fachinformatiker | AP1 Ready",
    description:
      "Alle AP1-Themen, Fortschritt pro Thema, Notenprognose und Prüfungssimulation. Von einem Azubi, der die AP1 selbst gut bestanden hat.",
    url: SITE.url,
    siteName: "AP1 Ready",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: { google: "qL-fVTG2OBdCoLfHuNzHYyM7oXw4Dv57Dkc4VaEy3CY" },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" data-theme="corporate" className={`${geist.variable}`}>
      <head></head>
      <body>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
