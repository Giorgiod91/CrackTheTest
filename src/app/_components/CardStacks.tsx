"use client";
import { CardStack } from "./ui/card-stack";
import { cn } from "../../../lib/utils";
export function CardStackDemo() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-emerald-100 px-1 py-0.5 font-bold text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500",
        className,
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Fachbereich: Mathematik",
    designation: "Kategorie: Zahlenreihen",
    content: (
      <div>
        <p className="mb-2">
          <Highlight>Welche Zahl</Highlight> setzt die folgende Zahlenreihe
          logisch fort?
        </p>
        <p className="mb-2 font-mono text-sm">3 – 6 – 12 – 24 – ?</p>
        <ul className="list-inside list-disc space-y-1 text-sm opacity-0 sm:opacity-100">
          <li>A. 30</li>
          <li>B. 36</li>
          <li>C. 48</li>
          <li>D. 60</li>
        </ul>
      </div>
    ),
  },
  {
    id: 1,
    name: "Fachbereich: Logik",
    designation: "Kategorie: Sprachverständnis",
    content: (
      <div>
        <p className="mb-2">
          <Highlight>Welches Wort</Highlight> passt <strong>nicht</strong> in
          die Reihe?
        </p>
        <p className="mb-2 font-mono text-sm">
          Auto – Motorrad – Fahrrad – Bus – Hammer
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm opacity-0 sm:opacity-100">
          <li>A. Bus</li>
          <li>B. Fahrrad</li>
          <li>C. Hammer</li>
          <li>D. Motorrad</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    name: "Fachbereich: Technik",
    designation: "Kategorie: Verständnisfragen",
    content: (
      <div>
        <p className="mb-2">
          <Highlight>Warum</Highlight> ist bei einem Fahrzeuggetriebe der erste
          Gang größer übersetzt als der fünfte?
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm opacity-0 sm:opacity-100">
          <li>A. Damit der Motor leiser läuft</li>
          <li>B. Um schneller fahren zu können</li>
          <li>C. Für mehr Kraft beim Anfahren</li>
          <li>D. Um Sprit zu sparen</li>
        </ul>
      </div>
    ),
  },
];
