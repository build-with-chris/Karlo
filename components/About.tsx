"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-white/30">
      <div className="container max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-center">Über Karlo</h2>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-center"
            >
              Seit über einem Jahrzehnt verzaubert Karlo sein Publikum mit atemberaubender
              Artistik und einer einzigartigen Bühnenpräsenz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="card">
                <h3 className="text-2xl mt-0 mb-4">Leidenschaft</h3>
                <p className="text-base">
                  Die Verbindung von Körperbeherrschung, Ästhetik und künstlerischem Ausdruck
                  steht im Mittelpunkt jeder Performance.
                </p>
              </div>

              <div className="card">
                <h3 className="text-2xl mt-0 mb-4">Perfektion</h3>
                <p className="text-base">
                  Jede Bewegung, jeder Moment wird mit höchster Präzision ausgeführt und
                  schafft unvergessliche Erlebnisse.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            >
              <blockquote className="text-center">
                "Artistik ist nicht nur Können – es ist die Kunst,
                Grenzen zu überschreiten und Menschen zu berühren."
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
