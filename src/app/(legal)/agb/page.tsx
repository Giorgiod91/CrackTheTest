import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <>
      <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Verträge zwischen Giorgio Dettmar, [Straße
        und Hausnummer], [PLZ] Hannover (nachfolgend „Anbieter“) und den
        Nutzern der Plattform CrackTheTest (nachfolgend „Nutzer“).
      </p>

      <h2>§ 2 Leistungsbeschreibung</h2>
      <p>
        CrackTheTest ist eine Online-Plattform zur Vorbereitung auf
        Eignungs- und Einstellungstests mit KI-generierten Übungstests. Der
        kostenlose Basiszugang umfasst eine begrenzte Anzahl an Tests. Mit dem
        einmalig zu bezahlenden „Prüfungspaket“ erhält der Nutzer erweiterten
        Zugang gemäß der Leistungsbeschreibung auf der Bestellseite.
      </p>

      <h2>§ 3 Vertragsschluss</h2>
      <p>
        Der Vertrag über das Prüfungspaket kommt zustande, wenn der Nutzer den
        Bestellvorgang über den Zahlungsdienstleister Stripe abschließt und
        die Zahlung bestätigt wird. Der Zugang wird unmittelbar nach
        Zahlungseingang freigeschaltet.
      </p>

      <h2>§ 4 Preise und Zahlung</h2>
      <p>
        Es gilt der zum Zeitpunkt der Bestellung angezeigte Preis. Alle Preise
        verstehen sich als Endpreise. Die Zahlung erfolgt einmalig über
        Stripe; es entsteht kein Abonnement und keine wiederkehrende Zahlung.
      </p>

      <h2>§ 5 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten
        ergeben sich aus der <Link href="/widerruf">Widerrufsbelehrung</Link>. Das
        Widerrufsrecht erlischt bei digitalen Inhalten, wenn der Anbieter mit
        der Ausführung begonnen hat, nachdem der Nutzer ausdrücklich
        zugestimmt und seine Kenntnis vom Erlöschen des Widerrufsrechts
        bestätigt hat.
      </p>

      <h2>§ 6 Nutzungsrechte und Pflichten</h2>
      <p>
        Der Zugang ist persönlich und nicht übertragbar. Eine Weitergabe von
        Zugangsdaten sowie die systematische Vervielfältigung oder
        Weiterverbreitung der Inhalte ist untersagt.
      </p>

      <h2>§ 7 Verfügbarkeit und KI-Inhalte</h2>
      <p>
        Der Anbieter strebt eine hohe Verfügbarkeit an, schuldet jedoch keine
        ununterbrochene Erreichbarkeit. Die Übungstests werden automatisiert
        durch KI erstellt und dienen ausschließlich der Übung; eine Garantie
        für die inhaltliche Übereinstimmung mit realen Eignungstests einzelner
        Unternehmen oder für das Bestehen solcher Tests wird nicht übernommen.
      </p>

      <h2>§ 8 Haftung</h2>
      <p>
        Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit
        sowie bei Verletzung von Leben, Körper und Gesundheit. Bei leichter
        Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
        Vertragspflichten, begrenzt auf den vorhersehbaren, vertragstypischen
        Schaden.
      </p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Gesetzliche Verbraucherschutzvorschriften bleiben
        unberührt. Sollten einzelne Bestimmungen unwirksam sein, bleibt die
        Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>

      <p>Stand: Juli 2026</p>
    </>
  );
}
