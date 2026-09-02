"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Auf dem Handy liegen zwischen Hero und Kontaktformular mehrere tausend Pixel
 * Scrollweg ohne eine Moeglichkeit, Karlo anzuschreiben. Dieser Knopf erscheint,
 * sobald der Hero durch ist, und verschwindet wieder im Kontaktbereich.
 */
export default function StickyContact() {
  const { t } = useLanguage();
  const [heroSichtbar, setHeroSichtbar] = useState(true);
  const [kontaktSichtbar, setKontaktSichtbar] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const kontakt = document.getElementById("contact");
    if (!hero || !kontakt) return;

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((eintrag) => {
          if (eintrag.target.id === "hero") setHeroSichtbar(eintrag.isIntersecting);
          if (eintrag.target.id === "contact") setKontaktSichtbar(eintrag.isIntersecting);
        });
      },
      { rootMargin: "-80px 0px 0px 0px" }
    );

    beobachter.observe(hero);
    beobachter.observe(kontakt);
    return () => beobachter.disconnect();
  }, []);

  const zeigen = !heroSichtbar && !kontaktSichtbar;

  return (
    <AnimatePresence>
      {zeigen && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-[9000] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <a
            href="#contact"
            className="btn btn-primary pointer-events-auto w-full max-w-sm justify-center text-center no-underline shadow-lg"
          >
            {t.hero.contactButton}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
