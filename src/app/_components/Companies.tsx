import React from "react";
import Image from "next/image";

type Props = {};

function Companies({}: Props) {
  const logos = [
    {
      name: "VW",
      src: "/Volkswagen.png",
    },
    { name: "Continental", src: "/conti.png" },
    { name: "Telekom", src: "/telekom.png" },
    { name: "Rossmann", src: "/rossmann.png" },
    { name: "HDI", src: "/hdi.png" },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 py-16">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
        Übe für Firmen Einstellungstests
      </h1>
      <p className="text-lg">übe speziell nach Beruf und Firma</p>
      <div className="flex flex-row space-x-7">
        {logos.map((logo, i) => (
          <div key={i} className="relative h-16 w-32">
            <Image
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
