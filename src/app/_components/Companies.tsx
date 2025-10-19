import React from "react";

type Props = {};

function Companies({}: Props) {
  const logos = [
    { name: "Google", src: "/logos/google.png" },
    { name: "Microsoft", src: "/logos/microsoft.png" },
    { name: "Amazon", src: "/logos/amazon.png" },
    { name: "Facebook", src: "/logos/facebook.png" },
    { name: "Apple", src: "/logos/apple.png" },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 py-16">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
        Übe für Firmen Einstellungstests
      </h1>
      <p className="text-lg">übe speziell nach Beruf und Firma</p>
      <div className="flex flex-row space-x-7">
        {logos.map((logo, i) => (
          <div key={i}>
            <img src={logo.src} alt={logo.name} title={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;
