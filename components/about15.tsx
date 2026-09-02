"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const About15 = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-white">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-12 xl:gap-16 gap-12 w-full">
            {/* Portraet, gerade gesetzt. Die Seite ist sonst ruhig gesetzt, ein
                geneigter Rahmen mit Schlagschatten faellt daneben auseinander. */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="m-0 w-[85%] flex-shrink-0 md:w-[50%] lg:w-[34%] xl:w-[30%]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-earth-100">
                <Image
                  src="/Portrait.webp"
                  alt="Karlo Janke, Cyr Wheel und Aerial Artist"
                  fill
                  className="pointer-events-none object-cover"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 35vw"
                />
              </div>

              <figcaption className="pt-3">
                <span className="block font-serif text-base font-medium tracking-tight text-earth-700 md:text-lg">
                  Karlo Janke
                </span>
                <span className="block text-xs text-earth-700/70 md:text-sm">
                  Cyr Wheel &amp; Aerial Artist
                </span>
              </figcaption>
            </motion.figure>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-[60%] xl:w-[65%] flex flex-col"
            >
              <h2 className="mt-0 mb-4 lg:mb-6">
                {t.about.title}
              </h2>
              <div className="flex flex-col space-y-3 lg:space-y-4">
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-earth-700/90">
                  {t.about.paragraph1}
                </p>
                {t.about.paragraph2 && (
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-earth-700/90">
                    {t.about.paragraph2}
                </p>
                )}
                {t.about.paragraph3 && (
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-earth-700/90">
                    {t.about.paragraph3}
                </p>
                )}
                {t.about.paragraph4 && (
                <p className="text-sm md:text-base lg:text-lg leading-relaxed text-earth-700/90">
                    {t.about.paragraph4}
                </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quote as Highlight Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 md:mt-16 lg:mt-20 w-full"
          >
            <div className="bg-earth-100/50 border-2 border-accent/30 rounded-lg p-5 md:p-6 lg:p-8 shadow-lg w-full max-w-5xl mx-auto">
              <blockquote className="text-base md:text-lg lg:text-xl leading-relaxed text-earth-700 italic font-serif text-center">
                {t.about.quote}
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { About15 };

