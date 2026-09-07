import type { Metadata } from "next";

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
              3. Einsatz von Google Analytics
            </h2>
            <p className="text-earth-700 leading-relaxed mb-4">
              Diese Website verwendet Google Analytics, einen Webanalysedienst
              der Google Ireland Limited („Google"). Google Analytics verwendet
              sogenannte „Cookies", also Textdateien, die auf Ihrem Computer
              gespeichert werden und die eine Analyse der Benutzung der Website
              durch Sie ermöglichen.
            </p>
            <p className="text-earth-700 leading-relaxed mb-4">
              Die durch das Cookie erzeugten Informationen über Ihre Benutzung
              dieser Website werden in der Regel an einen Server von Google in
              den USA übertragen und dort gespeichert. Diese Website nutzt die
              IP-Anonymisierung, sodass Ihre IP-Adresse innerhalb der EU oder
              des EWR vor der Übermittlung gekürzt wird.
            </p>
            <p className="text-earth-700 leading-relaxed mb-4">
              <strong className="text-earth-900">
                Zweck der Verarbeitung:
              </strong>{" "}
              Analyse des Nutzerverhaltens, um das Angebot zu verbessern.
              <br />
              <strong className="text-earth-900">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
            <p className="text-earth-700 leading-relaxed mb-4">
              Sie können die Speicherung der Cookies durch eine entsprechende
              Einstellung Ihrer Browser-Software verhindern. Außerdem können
              Sie die Erfassung der durch das Cookie erzeugten und auf Ihre
              Nutzung der Website bezogenen Daten (inkl. IP-Adresse) an Google
              sowie die Verarbeitung dieser Daten durch Google verhindern,
              indem Sie das unter folgendem Link verfügbare Browser-Plugin
              herunterladen und installieren:
            </p>
            <p className="text-earth-300 leading-relaxed mb-4">
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-2"
              >
                Google Analytics Opt-out Browser-Plugin
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </p>
            <p className="text-earth-700 leading-relaxed">
              Weitere Informationen zum Datenschutz bei Google finden Sie hier:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors inline-flex items-center gap-2"
              >
                Google Privacy Policy
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
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
          <a
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
          </a>
        </div>
      </div>
    </div>
  );
}
