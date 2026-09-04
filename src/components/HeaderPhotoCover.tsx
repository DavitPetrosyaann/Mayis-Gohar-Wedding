import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronDown, Camera } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useLanguage } from '../context/LanguageContext';
import { usePhotos } from '../context/PhotoContext';

interface HeaderPhotoCoverProps {
  isOpened: boolean;
  onOpen: () => void;
  onScrollToContent: () => void;
}

export const HeaderPhotoCover: React.FC<HeaderPhotoCoverProps> = ({
  isOpened,
  onOpen,
  onScrollToContent,
}) => {
  const { t, language, isRtl } = useLanguage();
  const { carouselPhotos } = usePhotos();
  const [isScaling, setIsScaling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Custom cover photo if user uploaded one
  const [customCover, setCustomCover] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mayis_gohar_cover_photo');
    } catch {
      return null;
    }
  });

  const coverPhoto =
    customCover ||
    carouselPhotos[0]?.url ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop';

  // "dont let scroll" before click: lock body & html scroll completely until opened
  useEffect(() => {
    if (!isOpened) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isOpened]);

  // Click handler: scale photo -> confetti -> open real form -> scroll after click
  const handleClickPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isScaling || isOpened) {
      if (isOpened) onScrollToContent();
      return;
    }

    setIsScaling(true);

    // Celebratory gold confetti burst
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FAF8F5', '#E6C280', '#CD7F32', '#FFD700'],
    });

    // After scale animation peaks (850ms), unlock scroll and scroll down into real form
    setTimeout(() => {
      onOpen();
      setIsScaling(false);

      // "scroll after click"
      setTimeout(() => {
        onScrollToContent();
      }, 350);
    }, 850);
  };

  const handleCustomCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCustomCover(result);
      try {
        localStorage.setItem('mayis_gohar_cover_photo', result);
      } catch {
        // ignore
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const groom = language === 'en' ? WEDDING_COUPLE.groomEn : WEDDING_COUPLE.groom;
  const bride = language === 'en' ? WEDDING_COUPLE.brideEn : WEDDING_COUPLE.bride;

  return (
    <div
      id="header-cover"
      onClick={() => {
        if (!isOpened) handleClickPhoto();
      }}
      className={`relative w-full ${
        isOpened ? 'min-h-[85vh] sm:min-h-[90vh]' : 'h-[100dvh]'
      } overflow-hidden bg-[#1C1B18] transition-all duration-700 flex items-center justify-center select-none ${
        !isOpened ? 'cursor-pointer' : ''
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Photo with smooth Scale-on-Click animation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isScaling ? 1.25 : 1,
          filter: isScaling
            ? 'brightness(1.15) contrast(1.05)'
            : isOpened
            ? 'brightness(0.85)'
            : 'brightness(0.92)',
        }}
        transition={{
          duration: isScaling ? 0.9 : 0.8,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <img
          src={coverPhoto}
          alt={`${groom} & ${bride}`}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* Cinematic Luxury Dark & Champagne Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/75 pointer-events-none" />

      {/* Subtle floating gold particle dust */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#FAF8F5] blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#CD7F32] blur-[1px]"
        />
      </div>

      {/* Decorative Gold Frame Accent */}
      <div className="absolute inset-5 sm:inset-8 md:inset-12 pointer-events-none border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] rounded-br-xl" />
      </div>

      {/* Optional Photo Change Trigger (top-right corner) */}
      <div className="absolute top-7 right-7 sm:top-10 sm:right-10 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          title="Փոխել գլխավոր նկարը"
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg group"
        >
          <Camera className="w-4 h-4 group-hover:scale-110 transition-transform text-[#E6C280]" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleCustomCoverUpload}
          className="hidden"
        />
      </div>

      {/* Centerpiece Content */}
      <div className="relative z-20 max-w-2xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-black/40 backdrop-blur-md shadow-md mb-4 sm:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-serif font-medium">
            {t.envelope.badge || 'Հարսանեկան Հրավեր'}
          </span>
        </motion.div>

        {/* Couple Names in Grand Gold Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="my-2 sm:my-3"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-[1.1]">
            {groom}
          </h1>

          <div className="flex items-center justify-center my-2 sm:my-3 gap-3 sm:gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-script text-3xl sm:text-5xl text-[#D4AF37] select-none drop-shadow-md">
              {t.hero.and}
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-[1.1]">
            {bride}
          </h1>
        </motion.div>

        {/* Wedding Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg font-serif tracking-[0.25em] text-[#FAF8F5]/90 mt-2 sm:mt-3 drop-shadow-md uppercase"
        >
          03.10.2026
        </motion.p>

        {/* Action button: Before click shows "Սեղմեք բացելու համար", after click shows explore chevron */}
        <div className="mt-8 sm:mt-10">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.button
                key="click-to-open"
                onClick={handleClickPhoto}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E6C280] to-[#CD7F32] text-[#1C1B18] font-serif text-xs uppercase tracking-[0.25em] font-semibold shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.65)] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                {/* Expanding pulsing ripple ring */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1.8], opacity: [0.7, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-[#D4AF37] pointer-events-none"
                />

                <Heart className="w-4 h-4 fill-[#1C1B18] text-[#1C1B18] animate-pulse" />
                <span className="tracking-widest">
                  {language === 'hy'
                    ? 'Սեղմեք Բացելու Համար'
                    : language === 'ru'
                    ? 'Нажмите, чтобы открыть'
                    : 'Click to Open'}
                </span>
                <Sparkles className="w-4 h-4 text-[#1C1B18] group-hover:rotate-12 transition-transform" />
              </motion.button>
            ) : (
              <motion.button
                key="scroll-down"
                onClick={(e) => {
                  e.stopPropagation();
                  onScrollToContent();
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex flex-col items-center gap-1 text-[#FAF8F5]/80 hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-[11px] font-serif tracking-[0.2em] uppercase">
                  {language === 'hy' ? 'Իմանալ Ավելին' : 'Explore'}
                </span>
                <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
