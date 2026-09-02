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
        className="section bg-gradient-to-b from-white/20 to-earth-50/30 pb-8 md:pb-12 lg:pb-14"
      >
        <div className="container max-w-6xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 mt-0 font-serif text-2xl font-medium tracking-tight text-earth-700 md:mb-8 md:text-3xl lg:mb-10 lg:text-4xl">
              {t.acts.introTitle}
            </h2>

            {/* Reihe 1: Einleitungstext und Aerial. Auf Mobil kommt das Video zuerst. */}
            <div className="mb-8 grid gap-8 md:grid-cols-2 lg:mb-10 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="order-3 flex items-start md:order-1"
              >
                <div className="w-full space-y-4">
                  <p className="text-sm leading-relaxed text-earth-700/90 md:text-base lg:text-lg">
                    {t.acts.introParagraph1}
                  </p>
                  <div className="border-t border-earth-200/60 pt-2">
                    <p className="text-sm leading-relaxed text-earth-700/90 md:text-base lg:text-lg">
                      {t.acts.introParagraph2}
                    </p>
                  </div>
                </div>
              </motion.div>

              <ActCard
                title={t.acts.aerial.title}
                icon={actIcons.aerial(32)}
                video={acts[0].video}
                poster={acts[0].poster}
                videoTitle={acts[0].videoTitle}
                hint={t.acts.aerial.clickForDetails}
                isInView={isInView}
                offsetX={30}
                delay={0.2}
                className="order-1 md:order-2"
                onOpen={(time) => openClip("aerial", time)}
              />
            </div>

            {/* Reihe 2: Cyr Wheel und der Hinweis auf individuelle Acts */}
            <div className="mb-8 grid gap-8 md:grid-cols-2 lg:mb-10 lg:gap-12">
              <ActCard
                title={t.acts.cyrWheel.title}
                icon={actIcons.cyrWheel(32)}
                video={acts[1].video}
                poster={acts[1].poster}
                videoTitle={acts[1].videoTitle}
                hint={t.acts.cyrWheel.clickForDetails}
                isInView={isInView}
                offsetX={-30}
                delay={0.3}
                className="order-4 md:order-1"
                onOpen={(time) => openClip("cyrWheel", time)}
              />

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-5 flex items-center md:order-2"
              >
                <div className="w-full rounded-lg border border-earth-200 bg-earth-100/50 px-6 py-8">
                  <h3 className="mb-4 mt-0 font-serif text-xl leading-snug text-earth-700">
                    {t.acts.customActs.title}
                  </h3>
                  <p className="mb-6 text-[0.9375rem] leading-relaxed text-earth-700/90">
                    {t.acts.customActs.description}
                  </p>
                  <a
                    href="#contact"
                    className="btn btn-outline inline-flex items-center justify-center no-underline"
                  >
                    {t.acts.customActs.contact}
                  </a>
                </div>
              </motion.div>
            </div>
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
