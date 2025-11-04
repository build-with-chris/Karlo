"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const portfolioItems = [
  {
    id: 1,
    title: "Cyr Wheel Performance",
    category: "Cyr Wheel",
    year: "2024",
  },
  {
    id: 2,
    title: "Aerial Silk",
    category: "Aerial",
    year: "2024",
  },
  {
    id: 3,
    title: "Street Performance",
    category: "Cyr Wheel",
    year: "2023",
  },
  {
    id: 4,
    title: "Festival Highlight",
    category: "Aerial",
    year: "2023",
  },
  {
    id: 5,
    title: "Corporate Event",
    category: "Cyr Wheel",
    year: "2023",
  },
  {
    id: 6,
    title: "Theater Show",
    category: "Aerial",
    year: "2022",
  },
];

const categories = ["Alle", "Cyr Wheel", "Aerial"];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filteredItems =
    activeCategory === "Alle"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section bg-white/30">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center mb-12">Portfolio</h2>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeCategory === category
                    ? "bg-accent text-white"
                    : "bg-earth-100 text-earth-700 hover:bg-earth-300"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="card p-0 overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-earth-200 to-earth-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-earth-400 text-5xl opacity-20">
                      {item.category === "Cyr Wheel" ? "⭕" : "🎭"}
                    </div>
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-accent font-medium mb-2">
                      {item.category} • {item.year}
                    </p>
                    <h3 className="text-xl mt-0 mb-0 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
