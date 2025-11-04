"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const acts = [
  {
    title: "Cyr Wheel",
    description:
      "Eine hypnotisierende Darbietung am großen Rad. Kraft, Eleganz und präzise Choreografie verschmelzen zu einem spektakulären visuellen Erlebnis.",
    highlights: [
      "Dynamische Rotationen",
      "Akrobatische Formationen",
      "Musikalische Synchronisation",
    ],
  },
  {
    title: "Aerial",
    description:
      "Schwerelos durch die Lüfte schweben. Die Luftartistik verbindet Grazie mit athletischer Meisterschaft in atemberaubender Höhe.",
    highlights: [
      "Vertikale Choreografie",
      "Elegante Figuren",
      "Körperbeherrschung",
    ],
  },
];

export default function Acts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="acts" className="section">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-16">Acts & Performances</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {acts.map((act, index) => (
              <motion.div
                key={act.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                className="card group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Platzhalter für Bild */}
                <div className="aspect-[4/3] bg-gradient-to-br from-earth-300 to-earth-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  <span className="text-earth-500 text-6xl font-serif opacity-30">
                    {act.title === "Cyr Wheel" ? "⭕" : "🎭"}
                  </span>
                </div>

                <h3 className="text-3xl mt-0 mb-4 group-hover:text-accent transition-colors">
                  {act.title}
                </h3>

                <p className="text-base mb-6">{act.description}</p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-earth-500">
                    Highlights
                  </h4>
                  <ul className="space-y-2 ml-0">
                    {act.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-3 text-base"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <a href="#portfolio" className="btn btn-primary no-underline">
              Galerie ansehen
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
