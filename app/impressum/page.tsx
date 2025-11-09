import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Kontaktinformationen von Karlo Janke",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Spacer */}
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl text-earth-900 mb-12">
          Impressum
        </h1>

        <div className="prose prose-earth max-w-none">
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Karlo Janke<br />
              Karl-Antonio Janke<br />
              Buchéstraße 64<br />
              12059 Berlin<br />
              Deutschland
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">Kontakt</h2>
            <p className="text-earth-700 leading-relaxed">
              Telefon:{" "}
              <a
                href="tel:+4915789115708"
                className="text-accent hover:text-accent-light transition-colors"
              >
                +49 (0) 157 89115708
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:info@karlojanke.com"
                className="text-accent hover:text-accent-light transition-colors"
              >
                info@karlojanke.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Berufsbezeichnung
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Freischaffender Künstler
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Karl-Antonio Janke<br />
              Buchéstraße 64<br />
              12059 Berlin
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Haftung für Inhalte
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter
              bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Haftung für Links
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Diese Website enthält Links zu externen Websites Dritter, auf
              deren Inhalte kein Einfluss besteht. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              verantwortlich.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-earth-900 mb-4">
              Urheberrecht
            </h2>
            <p className="text-earth-700 leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
