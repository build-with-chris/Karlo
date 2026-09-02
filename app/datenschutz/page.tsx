import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Karlo Janke",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Spacer */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl text-earth-900 mb-12">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-earth max-w-none">
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              1. Verantwortlicher
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Karlo Janke<br />
              Karl-Antonio Janke<br />
              Buchéstraße 64<br />
              12059 Berlin<br />
              Deutschland<br />
              E-Mail:{" "}
              <a
                href="mailto:info@karlojanke.com"
                className="text-accent hover:text-accent-light transition-colors"
              >
                info@karlojanke.com
              </a>
            </p>
          </section>

          <div className="border-t border-earth-300 my-8" />

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              2. Erhebung und Speicherung personenbezogener Daten sowie Art und
              Zweck von deren Verwendung
            </h2>
            <p className="text-earth-700 leading-relaxed mb-4">
              Beim Besuch dieser Website werden automatisch Informationen durch
              den auf Ihrem Endgerät zum Einsatz kommenden Browser an den
              Server der Website gesendet. Diese Informationen (z. B.
              IP-Adresse, Datum und Uhrzeit des Zugriffs, verwendeter Browser,
              Betriebssystem) werden temporär in Logfiles gespeichert.
            </p>
            <p className="text-earth-700 leading-relaxed">
              Die Daten sind technisch erforderlich, um die Website anzuzeigen
              und die Stabilität und Sicherheit zu gewährleisten. Eine
              Zusammenführung dieser Daten mit anderen Datenquellen findet
              nicht statt.
            </p>
          </section>

          <div className="border-t border-earth-300 my-8" />

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              3. Web-Analyse und Tracking
            </h2>
            <p className="text-earth-700 leading-relaxed mb-4">
              Diese Website setzt keine Analyse-, Tracking- oder
              Marketing-Dienste ein. Es werden keine Daten an Google Analytics
              oder vergleichbare Anbieter übermittelt und es findet keine
              Profilbildung statt.
            </p>
            <p className="text-earth-700 leading-relaxed">
              Im lokalen Speicher Ihres Browsers werden lediglich Ihre gewählte
              Sprache und Ihre Auswahl im Cookie-Hinweis abgelegt. Diese Angaben
              verlassen Ihr Gerät nicht und werden nicht an uns übertragen.
            </p>
          </section>

          <div className="border-t border-earth-300 my-8" />

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              4. Ihre Rechte
            </h2>
            <p className="text-earth-700 leading-relaxed mb-4">
              Sie haben das Recht auf:
            </p>
            <ul className="list-disc list-inside space-y-2 text-earth-700 ml-4">
              <li>
                Auskunft über Ihre gespeicherten personenbezogenen Daten (Art.
                15 DSGVO)
              </li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            </ul>
            <p className="text-earth-700 leading-relaxed mt-4">
              Zur Wahrnehmung dieser Rechte genügt eine formlose Mitteilung an:{" "}
              <a
                href="mailto:info@karlojanke.com"
                className="text-accent hover:text-accent-light transition-colors"
              >
                info@karlojanke.com
              </a>
            </p>
          </section>

          <div className="border-t border-earth-300 my-8" />

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              5. Änderung dieser Datenschutzerklärung
            </h2>
            <p className="text-earth-700 leading-relaxed mb-4">
              Ich behalte mir vor, diese Datenschutzerklärung anzupassen, um
              sie an aktuelle rechtliche Anforderungen oder Änderungen des
              Dienstes anzupassen.
            </p>
            <p className="text-earth-700 leading-relaxed">
              <strong className="text-earth-900">Stand:</strong> November 2025
            </p>
          </section>
        </div>

        {/* Back to Home Link */}
        <div className="mt-12 pt-8 border-t border-earth-300">
          <Link
            href="/"
            className="inline-flex items-center text-accent hover:text-accent-light transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
