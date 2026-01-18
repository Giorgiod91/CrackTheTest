"use client";
import { CardStack } from "./ui/card-stack";
import { cn } from "../../../lib/utils";
import { useState } from "react";
import Image from "next/image";
export function CardStackDemo() {
  const my_image = "/first.png";

  const CARDS = [
    {
      id: 0,
      name: "Premium  Dashboard",
      content: (
        <div>
          <Image
            src={my_image}
            width={500}
            height={500}
            alt="Question"
            objectFit="contain"
            className="mb-2 w-full"
          />
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
            <Highlight>Warum</Highlight> ist bei einem Fahrzeuggetriebe der
            erste Gang größer übersetzt als der fünfte?
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
        "bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-1 py-0.5 font-bold text-black",
        className,
      )}
    >
      {children}
    </span>
  );
};
