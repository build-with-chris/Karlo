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

// Mischt die Bilder so, dass zwei Fotos derselben Person nicht nebeneinander
// liegen. Laeuft ausserhalb des Renders, weil Math.random unrein ist, und wird
// pro Seitenaufruf genau einmal berechnet.
function mischen<T extends { photographer?: string }>(array: T[]): T[] {
  const gemischt = [...array];

  for (let versuch = 0; versuch < 100; versuch++) {
    for (let i = gemischt.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gemischt[i], gemischt[j]] = [gemischt[j], gemischt[i]];
    }

    const nachbarKonflikt = gemischt.some((eintrag, i) => {
      const naechster = gemischt[i + 1];
      return (
        naechster &&
        eintrag.photographer &&
        naechster.photographer &&
        eintrag.photographer === naechster.photographer
      );
    });

    if (!nachbarKonflikt) return gemischt;
  }

  return gemischt;
}

const LEER: LightboxImage[] = [];
let zwischenspeicher: LightboxImage[] | null = null;
const keinAbo = () => () => {};

function bilderHolen(): LightboxImage[] {
  if (!zwischenspeicher) {
    zwischenspeicher = mischen(
      portfolioItems.map((item) => ({
        src: item.thumb,
        alt: item.alt,
        photographer: item.photographer,
        photographerInstagram: item.photographerInstagram,
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

  const drehung = useMemo(() => {
    return (index: number) => {
      if (bilder.length === 0) return "";
      const position = (index - current + bilder.length) % bilder.length;
      if (position === 0)
        return "md:-rotate-45 md:translate-x-40 md:scale-75 md:relative";
      if (position === 1) return "md:rotate-0 md:z-10 md:relative";
      if (position === 2)
        return "md:rotate-45 md:-translate-x-40 md:scale-75 md:relative";
      return "";
    };
  }, [current, bilder.length]);

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
            <CarouselItem key={`${bild.src}-${index}`} className="my-10 md:basis-1/3">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`${t.portfolio.viewImage}: ${bild.alt}`}
                className={`relative block h-[420px] w-full cursor-zoom-in overflow-hidden transition-transform duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${drehung(index)}`}
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
