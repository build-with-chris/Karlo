"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <>
      <section id="portfolio" className="section bg-white/30">
        <div className="container max-w-7xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header & Introduction */}
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="mb-4">Portfolio</h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base text-earth-700/80"
              >
                Ausgewählte Momente
              </motion.p>
            </div>

            {/* Portfolio Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {portfolioItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedItem(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.title}, ${item.location}, ${item.year} öffnen`}
                >
                  <div className="relative overflow-hidden rounded-lg bg-earth-100 aspect-[3/4] shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    {/* Image */}
                    <Image
                      src={item.thumb}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Hover Overlay with Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-700/90 via-earth-700/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white text-base md:text-lg font-serif mb-1 mt-0 drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="text-earth-100 text-xs md:text-sm mb-0">
                        {item.location} • {item.year}
                      </p>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-earth-700">
                      {item.category}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-700/95 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-earth-700 hover:bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Dialog schließen"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSelectedItem(null);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[4/3] bg-earth-100">
                <Image
                  src={selectedItem.thumb}
                  alt={selectedItem.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 id="lightbox-title" className="text-2xl md:text-3xl font-serif text-earth-700 mb-3 mt-0">
                  {selectedItem.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-earth-700/80">
                  <p className="flex items-center gap-2 mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {selectedItem.location}
                  </p>
                  <p className="flex items-center gap-2 mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {selectedItem.year}
                  </p>
                  <p className="flex items-center gap-2 mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    {selectedItem.category}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
