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
    <section id="about" className="section bg-gradient-to-b from-white/30 via-white/20 to-earth-50/50">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-12 xl:gap-16 gap-12 w-full">
            {/* Image Card with Rotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
              animate={isInView ? { opacity: 1, rotate: -6, scale: 1 } : { opacity: 0, rotate: -10, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[85%] md:w-[50%] lg:w-[34%] xl:w-[30%] flex-shrink-0 bg-earth-900 text-earth-50 rotate-[-6deg] border-2 border-earth-700 p-2 shadow-xl"
            >
              <div className="relative w-full h-[274px] md:h-[380px] lg:h-[313px] xl:h-[343px] overflow-hidden">
                <Image
                  src="/Portrait.webp"
                  alt="Karlo Janke – Professioneller Cyr Wheel & Aerial Artist Portrait"
                  fill
                  className="object-cover pointer-events-none"
                  style={{ objectPosition: 'center center' }}
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 35vw"
                />
              </div>

              <div className="pb-1.5 pt-2.5 px-2">
                <p className="text-earth-50 text-base md:text-lg font-serif font-medium tracking-tight">
                  Karlo Janke
                </p>
                <p className="text-earth-50/70 text-xs md:text-sm">Cyr Wheel & Aerial Artist</p>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-[60%] xl:w-[65%] flex flex-col lg:h-[320px] xl:h-[350px]"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-earth-700 mb-4 lg:mb-6">
                {t.about.title}
              </h2>
              <div className="flex flex-col lg:justify-between lg:flex-1 space-y-3 lg:space-y-4">
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

