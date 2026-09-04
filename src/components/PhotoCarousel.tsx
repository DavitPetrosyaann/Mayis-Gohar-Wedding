import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Camera,
  RotateCcw,
} from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';

export const PhotoCarousel: React.FC = () => {
  const { carouselPhotos, addCustomPhotos, resetToDefault, isCustomLoaded } = usePhotos();
  const { t, isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % carouselPhotos.length);
  }, [carouselPhotos.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + carouselPhotos.length) % carouselPhotos.length);
  }, [carouselPhotos.length]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const currentPhoto = carouselPhotos[currentIndex] || carouselPhotos[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addCustomPhotos(e.target.files);
      setCurrentIndex(0);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section
      id="photos"
      className="relative py-12 sm:py-20 px-4 sm:px-6 bg-[#FAF8F5] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        {/* Hidden File Input for Custom Photos */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Section Controls (if custom photos loaded) */}
        {isCustomLoaded && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={resetToDefault}
              className="px-3 py-2 rounded-full bg-white/70 hover:bg-white text-[#1C1B18]/65 hover:text-[#1C1B18] text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-[#8A929A]/30"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.gallery.resetPhotos}</span>
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Main Visual Slider Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#8A929A]/35 bg-[#1C1B18]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentPhoto.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle bottom gradient and Photo Counter */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none z-10">
                  <div className="bg-[#1C1B18]/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-right shadow-md">
                    <span className="font-serif text-xs sm:text-sm text-[#FAF8F5] font-medium tracking-widest">
                      {String(currentIndex + 1).padStart(2, '0')} /{' '}
                      {String(carouselPhotos.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left/Right Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label={t.gallery.prev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#1C1B18] border border-[#8A929A]/40 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              aria-label={t.gallery.next}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#1C1B18] border border-[#8A929A]/40 shadow-md backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Autoplay Pause/Play button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-xs transition-all cursor-pointer"
              title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {carouselPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#8A5F42]' : 'w-2 bg-[#8A929A]/40 hover:bg-[#8A929A]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
