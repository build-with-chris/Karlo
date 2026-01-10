"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";

const Gallery21 = () => {
  const { t } = useLanguage();
  const [domLoaded, setDomLoaded] = useState(false);
  const [shuffledImages, setShuffledImages] = useState<Array<{ 
    src: string; 
    alt: string;
    photographer?: string;
    photographerInstagram?: string;
  }>>([]);

  // Shuffle function (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setDomLoaded(true);
    // Shuffle images on mount
    const images = portfolioItems.map(item => ({
      src: item.thumb,
      alt: item.alt,
      photographer: item.photographer,
      photographerInstagram: item.photographerInstagram,
    }));
    setShuffledImages(shuffleArray(images));
  }, []);

  const css = `
  .mySwiper21 {
    width: 100%;
    height: 500px;
    padding-bottom: 50px;
  }
  
  .mySwiper21 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 500px;
  }
  
  @media (max-width: 768px) {
    .mySwiper21 .swiper-slide {
      width: 100vw;
      max-width: 100vw;
    }
    .mySwiper21 {
      height: 400px;
    }
  }
  
  .mySwiper21 .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <div>
      <style>{css}</style>
      <div className="container relative flex max-w-6xl flex-col items-center gap-8 lg:gap-10 overflow-x-clip px-4 md:px-4 py-4 md:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center w-full mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-earth-700 mb-3 md:mb-4"
          >
            {t.portfolio.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-earth-700/80"
          >
            Ausgewählte Momente
          </motion.p>
        </div>
      </div>

      {/* Swiper section - full width on mobile */}
      <div className="relative w-full overflow-x-clip">
        {/* Left and right mask */}
        <div className="pointer-events-none absolute left-0 z-10 h-full w-24 bg-gradient-to-r from-earth-50/20 md:from-earth-50/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-24 bg-gradient-to-l from-earth-50/20 md:from-earth-50/50 to-transparent" />

        <div className="relative h-[500px] w-full max-w-6xl mx-auto">
          {domLoaded && shuffledImages.length > 0 && (
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.5,
              }}
            >
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                className="mySwiper21"
                modules={[EffectCoverflow, Autoplay]}
                breakpoints={{
                  320: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 25,
                  },
                  768: {
                    slidesPerView: 1.8,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 2.2,
                    spaceBetween: 30,
                  },
                }}
              >
                {shuffledImages.map((image, index) => (
                  <SwiperSlide key={`${image.src}-${index}`}>
                    <div className="relative h-full w-full group">
                      <img
                        className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                        src={image.src}
                        alt={image.alt || `Karlo Janke Performance Moment ${index + 1}`}
                        loading="lazy"
                      />
                      {image.photographer && (
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md rounded-md px-2 py-1 text-white/90 text-[10px] md:text-xs font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                          {image.photographerInstagram ? (
                            <a
                              href={`https://www.instagram.com/${image.photographerInstagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors no-underline flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="text-[8px] md:text-[10px]">📷</span>
                              <span>{image.photographerInstagram}</span>
                            </a>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="text-[8px] md:text-[10px]">📷</span>
                              <span>{image.photographer}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Gallery21 };
