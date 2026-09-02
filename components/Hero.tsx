"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLinks from "@/components/SocialLinks";

// Textschatten, damit die helle Schrift auf jedem Videobild lesbar bleibt
const textShadow = "0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[85svh] overflow-hidden md:min-h-screen"
    >
      {/* Hintergrund: Bild auf Mobil, Video ab md. Die Umschaltung passiert per CSS,
          damit kein Geraet die jeweils andere Variante mitlaedt. */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HeroMobile.webp"
          alt="Karlo Janke bei einer Cyr-Wheel-Performance auf der Buehne"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_25%] md:hidden"
        />
        {/* Eigene, kurze Schleife statt des vollen Trailers: heller, 2 statt
            4,7 MB, und der Trailer bleibt im Modal unveraendert erhalten. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/HeroPoster.webp"
          aria-hidden="true"
          className="hidden h-full w-full object-cover md:block"
        >
          <source src="/HeroLoop.mp4" type="video/mp4" />
        </video>

        {/* Abdunklung nur so stark wie noetig: oben fuer die Navigation, unten
            fuer Name und Buttons, in der Mitte bleibt das Bild offen. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55 md:from-black/30 md:via-black/15 md:to-black/55" />

        {/* Weicher Uebergang in den hellen Seitenhintergrund */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-earth-50/70 md:hidden" />
      </div>

      {/* Inhalt: auf Mobil oben der Name und unten die Buttons, ab md alles unten links */}
      <div className="relative z-10 flex min-h-[85svh] flex-col items-center px-4 pb-12 pt-24 text-center md:min-h-screen md:items-start md:justify-end md:px-8 md:pb-12 md:pt-0 md:text-left lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="mb-1 mt-0 font-serif text-[clamp(2.5rem,8vw,3.5rem)] leading-tight text-white"
            style={{ textShadow }}
          >
            Karlo
          </h1>
          <p
            className="mb-0 text-sm font-light uppercase tracking-[0.05em] text-earth-50/90 md:text-base"
            style={{ textShadow }}
          >
            {t.hero.tagline}
          </p>
        </motion.div>

        {/* Schiebt die Buttons auf Mobil an den unteren Rand */}
        <div className="flex-1 md:hidden" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#portfolio"
            className="btn btn-primary px-4 py-2.5 text-sm no-underline"
          >
            {t.hero.portfolioButton}
          </a>
          <a
            href="#contact"
            className="btn btn-outline border-white/40 bg-white/10 px-4 py-2.5 text-sm text-white no-underline backdrop-blur-sm hover:bg-white/20"
          >
            {t.hero.contactButton}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-5 md:mt-4"
        >
          <SocialLinks variant="onImage" />
        </motion.div>
      </div>

      {/* Scroll-Hinweis, nur auf Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden md:block lg:right-12"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/80 drop-shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
