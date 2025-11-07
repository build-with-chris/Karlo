"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

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
    <section id="about" className="section bg-white/30">
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-12 md:mb-16">Über Karlo</h2>

          {/* Full Width Content Layout */}
          <div className="max-w-5xl mx-auto">
            {/* Video - Only on Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:hidden"
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
                  Professioneller Cyr-Wheel- und Luftartist mit internationalem Renommee.
                  Performances, die technische Präzision mit künstlerischem Ausdruck vereinen.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-earth-700/90 text-center md:text-left">
                  Präzision in jeder Bewegung, perfektes Timing im Zusammenspiel von Körper und Musik,
                  absolute Kontrolle über Technik und Ausdruck.
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
                  For me, the real excitement lies in the tension—the immersive dive into the moment where suspense, timing, and control all merge. It's about creating that captivating experience for everyone.
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
            <h3 className="text-center text-2xl font-serif text-earth-700 mb-16 md:mb-20">
              Werdegang
            </h3>

            {/* Desktop Timeline - Horizontal */}
            <div className="hidden md:block relative" style={{ paddingTop: '10rem', paddingBottom: '10rem' }}>
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
                  const isAbove = index % 2 === 0;

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
                      <div
                        style={{
                          position: 'absolute',
                          top: isAbove ? 'auto' : '50%',
                          bottom: isAbove ? '50%' : 'auto',
                          transform: isAbove ? 'translateY(-3rem)' : 'translateY(3rem)',
                          width: '100%',
                          maxWidth: '180px',
                          padding: '0 0.25rem'
                        }}
                      >
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          style={{
                            width: '100%',
                            background: 'white',
                            border: '2px solid #cdbba4',
                            borderRadius: '0.5rem',
                            padding: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isExpanded
                              ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
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
                          <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6e5742', marginBottom: '0.25rem', lineHeight: '1.3' }}>
                            {milestone.title}
                          </div>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                fontSize: '0.7rem',
                                color: 'rgba(110, 87, 66, 0.85)',
                                marginTop: '0.5rem',
                                lineHeight: '1.4'
                              }}
                            >
                              {milestone.description}
                            </motion.div>
                          )}
                        </button>
                      </div>

                      {/* Year Circle on Timeline */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          backgroundColor: isExpanded ? '#b08a5b' : 'white',
                          border: '3px solid #b08a5b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: isExpanded ? 'white' : '#b08a5b',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      >
                        {milestone.year}
                      </div>
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
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        minWidth: '60px',
                        borderRadius: '50%',
                        backgroundColor: isExpanded ? '#b08a5b' : 'white',
                        border: '3px solid #b08a5b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: isExpanded ? 'white' : '#b08a5b',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    >
                      {milestone.year}
                    </div>

                    {/* Content Box */}
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      style={{
                        flex: 1,
                        background: 'white',
                        border: '2px solid #cdbba4',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: isExpanded
                          ? '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                          : '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6e5742', marginBottom: '0.25rem' }}>
                        {milestone.title}
                      </div>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            fontSize: '0.8rem',
                            color: 'rgba(110, 87, 66, 0.85)',
                            marginTop: '0.5rem',
                            lineHeight: '1.5'
                          }}
                        >
                          {milestone.description}
                        </motion.div>
                      )}
                    </button>
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
