import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import ConsentBanner from "./_components/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://crack-the-test.vercel.app"),
  title: {
    default: "CrackTheTest – Eignungstest online üben mit KI",
    template: "%s | CrackTheTest",
  },
  description:
    "Bereite dich mit KI-generierten Übungstests auf deinen Eignungstest vor – für Ausbildung, VW, Continental & mehr. Logik, Mathe und Konzentration gezielt trainieren.",
  keywords: [
    "Eignungstest üben",
    "Einstellungstest Ausbildung",
    "VW Eignungstest",
    "Eignungstest online",
    "Einstellungstest Vorbereitung",
  ],
  openGraph: {
    title: "CrackTheTest – Eignungstest online üben mit KI",
    description:
      "KI-gestützte Vorbereitung auf Eignungstests und Einstellungstests für Ausbildung und Beruf.",
    url: "https://crack-the-test.vercel.app",
    siteName: "CrackTheTest",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
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
        <TRPCReactProvider>
          {children} <ConsentBanner />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
