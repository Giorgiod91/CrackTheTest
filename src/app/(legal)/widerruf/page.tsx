import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  robots: { index: true, follow: true },
};

export default function WiderrufPage() {
  return (
    <>
      <h1>Widerrufsbelehrung</h1>

      <h2>Widerrufsrecht</h2>
      <p>
        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
        ab dem Tag des Vertragsschlusses.
      </p>
      <p>
        Um dein Widerrufsrecht auszuüben, musst du uns (Giorgio Dettmar,
        [Straße und Hausnummer], [PLZ] Hannover, E-Mail:{" "}
        <a href="mailto:giorgio.dettmar@gmx.de">giorgio.dettmar@gmx.de</a>)
        mittels einer eindeutigen Erklärung (z.&nbsp;B. per E-Mail) über
        deinen Entschluss, diesen Vertrag zu widerrufen, informieren. Zur
        Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über
        die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absendest.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die
        wir von dir erhalten haben, unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        deinen Widerruf bei uns eingegangen ist. Für die Rückzahlung verwenden
        wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion
        eingesetzt hast; in keinem Fall werden dir wegen dieser Rückzahlung
        Entgelte berechnet.
      </p>

      <h2>Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten</h2>
      <p>
        Das Widerrufsrecht erlischt bei einem Vertrag über die Bereitstellung
        von nicht auf einem körperlichen Datenträger befindlichen digitalen
        Inhalten, wenn wir mit der Ausführung des Vertrags begonnen haben,
        nachdem du ausdrücklich zugestimmt hast, dass wir vor Ablauf der
        Widerrufsfrist mit der Ausführung beginnen, und du deine Kenntnis
        davon bestätigt hast, dass du durch deine Zustimmung mit Beginn der
        Ausführung dein Widerrufsrecht verlierst.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        Wenn du den Vertrag widerrufen willst, kannst du folgendes Formular
        ausfüllen und an uns zurücksenden:
      </p>
      <blockquote>
        <p>
          An: Giorgio Dettmar, E-Mail: giorgio.dettmar@gmx.de
          <br />
          Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag
          über den Kauf des Prüfungspakets.
          <br />
          Bestellt am: ____________
          <br />
          Name und E-Mail des Nutzers: ____________
          <br />
          Datum: ____________
        </p>
      </blockquote>
    </>
  );
}
