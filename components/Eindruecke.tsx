"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useMemo, useState, useSyncExternalStore } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import Lightbox, { type LightboxImage } from "@/components/Lightbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { portfolioItems } from "@/data/portfolio";

type GalerieBild = LightboxImage & {
  tone: (typeof portfolioItems)[number]["tone"];
};

/**
 * Verteilt die Fotos im Reissverschluss ueber die drei Farbstimmungen, damit
 * nicht mehrere blaue oder mehrere warme Buehnenbilder nebeneinander liegen.
 * Innerhalb einer Stimmung wird zusaetzlich der Fotograf gewechselt.
 * Laeuft ausserhalb des Renders, weil Math.random unrein ist, und einmal pro
 * Seitenaufruf.
 */
function mischen(bilder: GalerieBild[]): GalerieBild[] {
  const gruppen = new Map<string, GalerieBild[]>();
  for (const bild of bilder) {
    const gruppe = gruppen.get(bild.tone) ?? [];
    gruppe.push(bild);
    gruppen.set(bild.tone, gruppe);
  }

  for (const gruppe of gruppen.values()) {
    for (let i = gruppe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gruppe[i], gruppe[j]] = [gruppe[j], gruppe[i]];
    }
  }

  const ergebnis: GalerieBild[] = [];
  let zuletzt: GalerieBild | undefined;

  while (ergebnis.length < bilder.length) {
    const offen = [...gruppen.entries()].filter(([, g]) => g.length > 0);
    if (offen.length === 0) break;

    // Andere Stimmung als zuletzt bevorzugen, darunter die groesste Gruppe,
    // damit gegen Ende keine Stimmung uebrig bleibt und sich haeuft.
    offen.sort((a, b) => {
      const wertA = (a[0] === zuletzt?.tone ? 100 : 0) - a[1].length;
      const wertB = (b[0] === zuletzt?.tone ? 100 : 0) - b[1].length;
      return wertA - wertB;
    });

    const gruppe = offen[0][1];
    let index = 0;
    if (zuletzt?.photographer) {
      const anderer = gruppe.findIndex(
        (bild) => bild.photographer !== zuletzt!.photographer
      );
      if (anderer !== -1) index = anderer;
    }

    const [gewaehlt] = gruppe.splice(index, 1);
    ergebnis.push(gewaehlt);
    zuletzt = gewaehlt;
  }

  return ergebnis;
}

const LEER: GalerieBild[] = [];
let zwischenspeicher: GalerieBild[] | null = null;
const keinAbo = () => () => {};

function bilderHolen(): GalerieBild[] {
  if (!zwischenspeicher) {
    zwischenspeicher = mischen(
      portfolioItems.map((item) => ({
        src: item.thumb,
        alt: item.alt,
        photographer: item.photographer,
        photographerInstagram: item.photographerInstagram,
        tone: item.tone,
      }))
    );
  }
  return zwischenspeicher;
}

/** Feine Skala unter und ueber dem Namen, wie im Original des Blocks */
function Skala() {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, filter: "blur(1px)" }}
          animate={{ opacity: i % 5 === 0 ? 1 : 0.2, filter: "blur(0px)" }}
          transition={{
            duration: 0.2,
            delay: i % 5 === 0 ? (i / 5) * 0.05 : 0,
            ease: "easeOut",
          }}
          className={`w-px bg-earth-700 ${i % 5 === 0 ? "h-[15px]" : "h-[10px]"}`}
        />
      ))}
    </div>
  );
}

export default function Eindruecke() {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Auf dem Server leer, im Browser die einmal gemischte Reihenfolge
  const bilder = useSyncExternalStore(keinAbo, bilderHolen, () => LEER);

  React.useEffect(() => {
    if (!api) return;
    const merken = () => setCurrent(api.selectedScrollSnap());
    api.on("select", merken);
    return () => {
      api.off("select", merken);
    };
  }, [api]);

  // Auf Desktop stehen drei Bilder nebeneinander, das mittlere ist current + 1.
  // Auf Mobil ist nur eines zu sehen, dort ist es current selbst.
  const mittleres =
    bilder.length === 0
      ? null
      : bilder[(current + (isMobile ? 0 : 1)) % bilder.length];

  const platz = useMemo(() => {
    return (index: number) =>
      bilder.length === 0
        ? -1
        : (index - current + bilder.length) % bilder.length;
  }, [current, bilder.length]);

  const drehung = (position: number) => {
    if (position === 0) return "md:-rotate-45 md:translate-x-40 md:scale-75";
    if (position === 2) return "md:rotate-45 md:-translate-x-40 md:scale-75";
    return "";
  };

  // Die Stapelung entscheidet sich auf Ebene der Karussell-Elemente. Ein
  // z-Index am inneren Knopf konkurriert nicht mit den Knoepfen der
  // Nachbarelemente, deshalb lag bisher immer das letzte im DOM oben, also
  // das rechte Bild ueber dem mittleren.
  const ebene = (position: number) => {
    if (position === 1) return "md:relative md:z-20";
    if (position === 0 || position === 2) return "md:relative md:z-10";
    return "";
  };

  if (bilder.length === 0) {
    // Platzhalter in gleicher Hoehe, damit beim Nachladen nichts springt
    return <div className="h-[420px] w-full" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="w-full max-w-5xl"
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
        setApi={setApi}
      >
        <CarouselContent>
          {bilder.map((bild, index) => (
            <CarouselItem
              key={`${bild.src}-${index}`}
              className={`my-10 md:basis-1/3 ${ebene(platz(index))}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`${t.portfolio.viewImage}: ${bild.alt}`}
                className={`relative block h-[420px] w-full cursor-zoom-in overflow-hidden transition-transform duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${drehung(platz(index))}`}
              >
                <Image
                  src={bild.src}
                  alt={bild.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Fotografen-Nachweis, an der Stelle, an der im Block der Name stand */}
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-2">
        <Skala />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={mittleres?.src ?? "leer"}
            /* Zwei Zeilen Platz, lange Namen brechen auf schmalen Geraeten um
               und sind sonst in die untere Skala gelaufen. */
            className="mb-0 min-h-[2.75rem] px-4 text-center text-sm text-earth-700/80 sm:min-h-[1.75rem]"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.4 }}
          >
            {mittleres?.photographer ? (
              <>
                Foto:{" "}
                {mittleres.photographerInstagram ? (
                  <a
                    href={`https://www.instagram.com/${mittleres.photographerInstagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth-700 underline-offset-2 hover:text-accent"
                  >
                    {mittleres.photographer}
                  </a>
                ) : (
                  mittleres.photographer
                )}
              </>
            ) : null}
          </motion.p>
        </AnimatePresence>
        <Skala />
      </div>

      <Lightbox
        images={bilder}
        index={lightboxIndex}
        closeLabel={t.portfolio.close}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
