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

const Gallery21 = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [shuffledImages, setShuffledImages] = useState<Array<{ src: string; alt: string }>>([]);

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
      width: 350px;
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
    <section className="py-16 md:py-24">
      <style>{css}</style>
      <div className="container relative flex max-w-6xl flex-col items-center gap-12 overflow-x-clip px-4">
        {/* Header */}
        <div className="text-center w-full mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-earth-700 mb-3 md:mb-4"
          >
            Portfolio
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

        {/* Left and right mask */}
        <div className="pointer-events-none absolute left-0 z-10 h-full w-24 bg-gradient-to-r from-earth-50/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 z-10 h-full w-24 bg-gradient-to-l from-earth-50/50 to-transparent" />

        <div className="relative h-[500px] w-full max-w-6xl">
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
                    slidesPerView: 1.2,
                    spaceBetween: 20,
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
                    <img
                      className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Gallery21 };
