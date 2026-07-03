import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO ist: Giorgio Dettmar, [Straße und
        Hausnummer], [PLZ] Hannover, Deutschland, E-Mail:{" "}
        <a href="mailto:giorgio.dettmar@gmx.de">giorgio.dettmar@gmx.de</a>.
      </p>

      <h2>2. Welche Daten wir verarbeiten</h2>
      <ul>
        <li>
          <strong>Kontodaten:</strong> Bei der Registrierung erheben wir deine
          E-Mail-Adresse und ein Passwort (verschlüsselt gespeichert).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        </li>
        <li>
          <strong>Nutzungsdaten:</strong> Erstellte Tests, Testergebnisse und
          Lernfortschritt, um dir dein Dashboard bereitzustellen.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
        </li>
        <li>
          <strong>Zahlungsdaten:</strong> Zahlungen werden über Stripe
          abgewickelt (siehe Ziffer 4). Wir selbst speichern keine
          Kreditkartendaten.
        </li>
        <li>
          <strong>Server-Logdaten:</strong> IP-Adresse, Zeitpunkt und
          aufgerufene Seite werden durch unseren Hosting-Anbieter technisch
          bedingt verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einem sicheren Betrieb).
        </li>
      </ul>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina,
        CA 91723, USA gehostet. Vercel verarbeitet dabei technisch notwendige
        Verbindungsdaten. Die Datenübermittlung in die USA erfolgt auf
        Grundlage der EU-Standardvertragsklauseln bzw. des EU-US Data Privacy
        Framework.
      </p>

      <h2>4. Zahlungsabwicklung (Stripe)</h2>
      <p>
        Für Zahlungen nutzen wir Stripe Payments Europe, Ltd., 1 Grand Canal
        Street Lower, Grand Canal Dock, Dublin, Irland. Stripe verarbeitet
        deine Zahlungsdaten (z.&nbsp;B. Kartendaten, Name, E-Mail) in eigener
        Verantwortung. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Weitere
        Informationen:{" "}
        <a
          href="https://stripe.com/de/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          stripe.com/de/privacy
        </a>
        .
      </p>

      <h2>5. Datenbank &amp; Authentifizierung (Supabase)</h2>
      <p>
        Kontodaten und Nutzungsdaten werden bei Supabase Inc. gespeichert.
        Die Verarbeitung erfolgt auf Grundlage eines
        Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO.
      </p>

      <h2>6. KI-generierte Inhalte</h2>
      <p>
        Zur Erstellung von Übungstests übermitteln wir deine Testanfragen
        (Thema, Schwierigkeitsgrad) an einen KI-Anbieter. Dabei werden keine
        personenbezogenen Daten wie Name oder E-Mail-Adresse übermittelt.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Wir verwenden technisch notwendige Cookies für Login und Sitzung
        (Rechtsgrundlage: § 25 Abs. 2 TDDDG, Art. 6 Abs. 1 lit. b DSGVO).
        Nicht notwendige Cookies setzen wir nur mit deiner Einwilligung über
        den Consent-Banner (Art. 6 Abs. 1 lit. a DSGVO); du kannst deine
        Einwilligung jederzeit widerrufen.
      </p>

      <h2>8. Speicherdauer</h2>
      <p>
        Wir speichern deine Daten, solange dein Konto besteht. Nach Löschung
        deines Kontos werden deine Daten entfernt, soweit keine gesetzlichen
        Aufbewahrungspflichten (z.&nbsp;B. steuerrechtlich, 10 Jahre für
        Rechnungsdaten) entgegenstehen.
      </p>

      <h2>9. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Außerdem
        kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren,
        z.&nbsp;B. bei der Landesbeauftragten für den Datenschutz
        Niedersachsen. Zur Ausübung deiner Rechte genügt eine E-Mail an{" "}
        <a href="mailto:giorgio.dettmar@gmx.de">giorgio.dettmar@gmx.de</a>.
      </p>

      <p>Stand: Juli 2026</p>
    </>
  );
}
