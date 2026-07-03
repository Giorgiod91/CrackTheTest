import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Giorgio Dettmar
        <br />
        {/* TODO: Vollständige Anschrift eintragen (Pflichtangabe!) */}
        [Straße und Hausnummer]
        <br />
        [PLZ] Hannover
        <br />
        Deutschland
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:giorgio.dettmar@gmx.de">giorgio.dettmar@gmx.de</a>
      </p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Giorgio Dettmar (Anschrift wie oben)</p>
      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </>
  );
}
