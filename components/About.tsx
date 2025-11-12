"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const milestones = [
    {
      year: "2012",
      title: "Erste professionelle Auftritte",
      description: "Beginn der professionellen Karriere als Cyr-Wheel-Artist. Erste Auftritte bei regionalen Festivals und Events etablierten den Grundstein für die internationale Karriere."
    },
    {
      year: "2015",
      title: "Internationaler Durchbruch",
      description: "Auftritt beim renommierten Festival Cirque du Monde in Paris markierte den internationalen Durchbruch. Anerkennung in der professionellen Circus-Community."
    },
    {
      year: "2018",
      title: "Repertoire-Erweiterung",
      description: "Erweiterung des künstlerischen Repertoires um Aerial Arts und Vertikaltuch. Intensive Trainingsphase und neue kreative Ausdrucksformen."
    },
    {
      year: "2021",
      title: "Cirque Éloize Gastauftritt",
      description: "Gastauftritt bei der weltbekannten Truppe Cirque Éloize in Montreal, Kanada. Zusammenarbeit mit internationalen Top-Artisten und Choreografen."
    },
    {
      year: "2023",
      title: "500+ Shows weltweit",
      description: "Meilenstein von über 500 Performances in 15 Ländern erreicht. Etablierung als gefragter Artist für internationale Events, Festivals und Theater-Produktionen."
    },
  ];

  return (
    <section id="about" className="section bg-gradient-to-b from-white/30 via-white/20 to-earth-50/50">
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image - Small and Subtle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-accent/30 shadow-lg">
              <Image
                src="/Portrait.webp"
                alt="Karlo Janke Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
          </motion.div>

          <h2 className="text-center mb-12 md:mb-16">Über Karlo</h2>

          {/* Full Width Content Layout */}
          <div className="max-w-5xl mx-auto">
            {/* Video - Only on Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:hidden mb-8 md:mb-0"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%', // 16:9 Aspect Ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  border: '3px solid #cdbba4',
                  backgroundColor: '#000'
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/QTJ6lkGcF7g?autoplay=1&mute=1&loop=1&playlist=QTJ6lkGcF7g&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="Karlo Performance Video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              </div>
            </motion.div>

            {/* Biography & Values with integrated Quote - Side by Side on Desktop */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-earth-700/90 text-center md:text-left">
                  Mein Name ist Karlo Janke und ich bin Zirkusartist. Meine Ausbildung absolvierte ich
                  an der Schule für zeitgenössischen Zirkus „Die Etage" in Berlin, wo ich mich auf Cyr Wheel
                  und Aerial Straps spezialisierte.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-earth-700/90 text-center md:text-left">
                  Seit meinem Abschluss hatte ich die Gelegenheit, auf einer Vielzahl von Bühnen aufzutreten.
                  Was ich am Zirkus am meisten schätze, ist seine Vielseitigkeit und die reine Freude am kreativen Spiel.
                  Wo es passt, bereichere ich meine Arbeit gerne mit einer Prise Humor.
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center h-full"
              >
                <blockquote
                  className="text-base md:text-lg leading-relaxed text-earth-700/90 italic font-serif pl-6 pr-4 py-4 border-l-2 border-accent/40"
                  style={{
                    fontStyle: 'italic'
                  }}
                >
                  Für mich liegt der eigentliche Reiz in der Spannung – dem tiefen Eintauchen in den Moment, in dem Atemlosigkeit, Timing und Kontrolle zu einer Einheit verschmelzen. Es geht darum, für das Publikum ein wirklich fesselndes Erlebnis zu schaffen.
                </blockquote>
              </motion.div>
            </div>
          </div>

          {/* Timeline - Full Width Below */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 md:mt-20"
          >
            {/* Desktop Timeline - Horizontal */}
            <div className="hidden md:block relative" style={{ paddingTop: '12rem', paddingBottom: '12rem' }}>
              {/* Timeline Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#cdbba4',
                  transform: 'translateY(-50%)'
                }}
              />

              {/* Timeline Items */}
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {milestones.map((milestone, index) => {
                  const isExpanded = expandedIndex === index;
                  // 2015 (index 1) und 2021 (index 3) sollen über der Timeline stehen
                  const isAbove = index === 0 || index === 1 || index === 3;

                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isTimelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      style={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      {/* Content Box - Above or Below */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isExpanded ? 1.15 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                          position: 'absolute',
                          top: isAbove ? 'auto' : '50%',
                          bottom: isAbove ? '50%' : 'auto',
                          transform: isAbove ? (isExpanded ? 'translateY(-6rem)' : 'translateY(-3.5rem)') : (isExpanded ? 'translateY(6rem)' : 'translateY(3.5rem)'),
                          width: '100%',
                          maxWidth: isExpanded ? '240px' : '180px',
                          padding: '0 0.25rem',
                          zIndex: isExpanded ? 20 : 10
                        }}
                      >
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          style={{
                            width: '100%',
                            background: 'white',
                            border: isExpanded ? '3px solid #b08a5b' : '2px solid #cdbba4',
                            borderRadius: '0.75rem',
                            padding: isExpanded ? '1.5rem 1.5rem 2.5rem 1.5rem' : '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isExpanded
                              ? '0 20px 25px -5px rgba(45, 36, 28, 0.2), 0 8px 10px -6px rgba(45, 36, 28, 0.15)'
                              : '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => {
                            if (!isExpanded) {
                              e.currentTarget.style.borderColor = '#b08a5b';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isExpanded) {
                              e.currentTarget.style.borderColor = '#cdbba4';
                              e.currentTarget.style.transform = 'scale(1)';
                            }
                          }}
                        >
                          <div style={{ 
                            fontSize: isExpanded ? '1rem' : '0.8rem', 
                            fontWeight: '600', 
                            color: '#6e5742', 
                            marginBottom: isExpanded ? '0.75rem' : '0.25rem', 
                            lineHeight: '1.3' 
                          }}>
                            {milestone.title}
                          </div>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                fontSize: '0.875rem',
                                color: 'rgba(110, 87, 66, 0.9)',
                                marginTop: '0.75rem',
                                lineHeight: '1.6'
                              }}
                            >
                              {milestone.description}
                            </motion.div>
                          )}
                        </button>
                      </motion.div>

                      {/* Year Circle on Timeline - Entgegengesetzt zum Text */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isExpanded ? 1.3 : 1,
                          width: isExpanded ? '80px' : '60px',
                          height: isExpanded ? '80px' : '60px',
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                          position: 'absolute',
                          // Wenn Text oben (isAbove=true), dann Jahreszahl unten
                          // Wenn Text unten (isAbove=false), dann Jahreszahl oben
                          top: isAbove ? 'auto' : (isExpanded ? 'calc(50% - 4rem)' : 'calc(50% - 3.5rem)'),
                          bottom: isAbove ? (isExpanded ? 'calc(50% - 4rem)' : 'calc(50% - 3.5rem)') : 'auto',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          borderRadius: '50%',
                          backgroundColor: isExpanded ? '#b08a5b' : 'white',
                          border: isExpanded ? '4px solid #b08a5b' : '3px solid #b08a5b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-serif)',
                          fontSize: isExpanded ? '1.125rem' : '0.875rem',
                          fontWeight: '600',
                          color: isExpanded ? 'white' : '#b08a5b',
                          boxShadow: isExpanded
                            ? '0 10px 15px -3px rgba(45, 36, 28, 0.25), 0 4px 6px -4px rgba(45, 36, 28, 0.15)'
                            : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          zIndex: isExpanded ? 30 : 10
                        }}
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      >
                        {milestone.year}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Timeline - Vertical */}
            <div className="block md:hidden space-y-6">
              {milestones.map((milestone, index) => {
                const isExpanded = expandedIndex === index;

                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Year Circle */}
                    <motion.button
                      type="button"
                      initial={false}
                      animate={{
                        scale: isExpanded ? 1.2 : 1,
                        width: isExpanded ? '72px' : '60px',
                        height: isExpanded ? '72px' : '60px',
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      style={{
                        minWidth: isExpanded ? '72px' : '60px',
                        borderRadius: '50%',
                        backgroundColor: isExpanded ? '#b08a5b' : 'white',
                        border: isExpanded ? '4px solid #b08a5b' : '3px solid #b08a5b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-serif)',
                        fontSize: isExpanded ? '1rem' : '0.875rem',
                        fontWeight: '600',
                        color: isExpanded ? 'white' : '#b08a5b',
                        boxShadow: isExpanded
                          ? '0 10px 15px -3px rgba(45, 36, 28, 0.25), 0 4px 6px -4px rgba(45, 36, 28, 0.15)'
                          : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        padding: 0,
                        margin: 0,
                        flexShrink: 0
                      }}
                    >
                      {milestone.year}
                    </motion.button>

                    {/* Content Box */}
                    <motion.button
                      type="button"
                      initial={false}
                      animate={{
                        scale: isExpanded ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      style={{
                        flex: 1,
                        background: 'white',
                        border: isExpanded ? '3px solid #b08a5b' : '2px solid #cdbba4',
                        borderRadius: '0.75rem',
                        padding: isExpanded ? '1.5rem' : '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: isExpanded
                          ? '0 20px 25px -5px rgba(45, 36, 28, 0.2), 0 8px 10px -6px rgba(45, 36, 28, 0.15)'
                          : '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                        textAlign: 'left',
                        minWidth: 0
                      }}
                    >
                      <div style={{ 
                        fontSize: isExpanded ? '1.125rem' : '0.875rem', 
                        fontWeight: '600', 
                        color: '#6e5742', 
                        marginBottom: isExpanded ? '0.75rem' : '0.25rem' 
                      }}>
                        {milestone.title}
                      </div>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            fontSize: '0.9375rem',
                            color: 'rgba(110, 87, 66, 0.9)',
                            marginTop: '0.75rem',
                            lineHeight: '1.6'
                          }}
                        >
                          {milestone.description}
                        </motion.div>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
