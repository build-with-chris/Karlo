"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const acts = [
  {
    title: "Cyr Wheel",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <line x1="12" y1="2" x2="12" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line>
      </svg>
    ),
    description:
      "Kraft, Eleganz und Präzision im großen Rad. Dynamische Rotationen verschmelzen mit akrobatischer Finesse zu einem hypnotisierenden visuellen Erlebnis.",
    keyfacts: [
      { label: "Bühnenfläche", value: "6 × 6 m" },
      { label: "Deckenhöhe", value: "min. 4 m" },
      { label: "Dauer", value: "5–8 Min." },
    ],
    techRider: "Tech-Rider verfügbar",
  },
  {
    title: "Aerial",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20"></path>
        <path d="M8 6c0 4-1 8-4 10"></path>
        <path d="M16 6c0 4 1 8 4 10"></path>
        <circle cx="12" cy="4" r="2"></circle>
      </svg>
    ),
    description:
      "Schwerelos in der Vertikalen. Grazie verbindet sich mit athletischer Kontrolle zu Momenten poetischer Spannung. Elegant, kraftvoll, präzise.",
    keyfacts: [
      { label: "Bühnenfläche", value: "4 × 4 m" },
      { label: "Deckenhöhe", value: "min. 6 m" },
      { label: "Dauer", value: "4–7 Min." },
    ],
    techRider: "Tech-Rider verfügbar",
  },
];

export default function Acts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="acts" className="section bg-gradient-to-b from-white/20 to-earth-50/30">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-10">Acts</h2>

          {/* Act Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {acts.map((act, index) => (
              <motion.article
                key={act.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className="card border border-earth-200 bg-white/50 hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(45, 36, 28, 0.15), 0 8px 10px -6px rgba(45, 36, 28, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-accent">{act.icon}</div>
                  <h3 className="text-xl mt-0 mb-0 font-serif text-earth-700">
                    {act.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5 text-earth-700/85">
                  {act.description}
                </p>

                {/* Key Facts */}
                <div className="space-y-3 mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-earth-500 mb-3">
                    Key Facts
                  </h4>
                  <dl className="space-y-2">
                    {act.keyfacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="flex justify-between items-baseline text-sm border-b border-earth-200/50 pb-1"
                      >
                        <dt className="text-earth-700/70">{fact.label}</dt>
                        <dd className="font-medium text-earth-700">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Tech Rider */}
                <p className="text-xs text-accent mt-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                  {act.techRider}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Custom Acts Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12"
            style={{ width: '100%', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div
              className="bg-earth-100/50 border border-earth-200 rounded-lg text-center"
              style={{
                padding: '2rem 1.5rem',
                minWidth: '280px',
                width: '100%'
              }}
            >
              <h3
                className="font-serif text-earth-700 mt-0"
                style={{
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                  width: '100%'
                }}
              >
                Custom Acts auf Anfrage
              </h3>
              <p
                className="text-earth-700/85"
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%'
                }}
              >
                Maßgeschneiderte Performances für Ihr Event – individuell abgestimmt auf Ihre Anforderungen.
              </p>
              <a
                href="#contact"
                className="btn btn-outline no-underline"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Anfrage senden
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
