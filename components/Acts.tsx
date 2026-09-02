"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ActCard from "@/components/ActCard";
import ActModal from "@/components/ActModal";
import { actIcons, acts, clips } from "@/data/acts";

export default function Acts() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [openClipId, setOpenClipId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(0);

  const openClip = (clipId: string, time = 0) => {
    setStartTime(time);
    setOpenClipId(clipId);
  };

  const openClipData = openClipId ? clips[openClipId] : null;
  const actText = openClipData ? t.acts[openClipData.actId] : null;

  return (
    <>
      <section
        id="acts"
        className="section bg-earth-50 pb-8 md:pb-12 lg:pb-14"
      >
        <div className="container max-w-6xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mt-0 mb-6 md:mb-8 lg:mb-10">
              {t.acts.introTitle}
            </h2>

            {/* Einleitung ueber die volle Breite. Vorher stand sie in einer
                Spalte neben einer 500 Pixel hohen Karte, was rund 285 Pixel
                Leerraum je Reihe erzeugt hat. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-10 max-w-3xl space-y-4 lg:mb-12"
            >
              <p className="text-base leading-relaxed text-earth-700/90 lg:text-lg">
                {t.acts.introParagraph1}
              </p>
              <p className="text-base leading-relaxed text-earth-700/90 lg:text-lg">
                {t.acts.introParagraph2}
              </p>
            </motion.div>

            {/* Beide Acts gleichwertig nebeneinander */}
            <div className="mb-10 grid gap-8 md:grid-cols-2 lg:mb-12 lg:gap-10">
              <ActCard
                title={t.acts.aerial.title}
                icon={actIcons.aerial(32)}
                video={acts[0].video}
                poster={acts[0].poster}
                videoTitle={acts[0].videoTitle}
                startAt={acts[0].startAt}
                hint={t.acts.aerial.watchVideo}
                isInView={isInView}
                offsetX={-30}
                delay={0.2}
                onOpen={(time) => openClip("aerial", time)}
              />

              <ActCard
                title={t.acts.cyrWheel.title}
                icon={actIcons.cyrWheel(32)}
                video={acts[1].video}
                poster={acts[1].poster}
                videoTitle={acts[1].videoTitle}
                startAt={acts[1].startAt}
                hint={t.acts.cyrWheel.watchVideo}
                isInView={isInView}
                offsetX={30}
                delay={0.3}
                onOpen={(time) => openClip("cyrWheel", time)}
              />
            </div>

            {/* Individuelle Acts, ueber die volle Breite */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-lg border border-earth-200 bg-earth-100/50 px-6 py-8 md:px-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="max-w-2xl">
                  <h3 className="mb-3 mt-0 font-serif text-xl leading-snug text-earth-700">
                    {t.acts.customActs.title}
                  </h3>
                  <p className="mb-0 text-[0.9375rem] leading-relaxed text-earth-700/90">
                    {t.acts.customActs.description}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="btn btn-outline inline-flex flex-shrink-0 items-center justify-center no-underline"
                >
                  {t.acts.customActs.contact}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {openClipData && actText && (
          <ActModal
            key={openClipData.id}
            title={
              openClipData.titleSuffix
                ? `${actText.title} - ${openClipData.titleSuffix}`
                : actText.title
            }
            icon={actIcons[openClipData.actId](32)}
            description={
              openClipData.id === "cyrWheelSecond"
                ? t.acts.cyrWheel.secondTrailerDescription
                : actText.description
            }
            video={openClipData.video}
            poster={openClipData.poster}
            videoTitle={openClipData.videoTitle}
            startTime={startTime}
            onClose={() => setOpenClipId(null)}
            onPrev={
              openClipData.prev ? () => openClip(openClipData.prev!) : undefined
            }
            onNext={
              openClipData.next ? () => openClip(openClipData.next!) : undefined
            }
            prevLabel={t.acts.cyrWheel.showFirstTrailer}
            nextLabel={t.acts.cyrWheel.showSecondTrailer}
          />
        )}
      </AnimatePresence>
    </>
  );
}
