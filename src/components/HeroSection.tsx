import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onRsvpClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRsvpClick, onExploreClick }) => {
  const { t, language, isRtl } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle floating silver/terracotta particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.pulse;

        if (p.opacity > 0.8 || p.opacity < 0.2) {
          p.pulse = -p.pulse;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 123, 91, ${p.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#C0C7D1';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const groom = language === 'en' ? WEDDING_COUPLE.groomEn : WEDDING_COUPLE.groom;
  const bride = language === 'en' ? WEDDING_COUPLE.brideEn : WEDDING_COUPLE.bride;

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 overflow-hidden bg-gradient-to-b from-[#F3EFE6] via-[#FAF8F5] to-[#F3EFE6]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Floating particles background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
      />

      {/* Decorative Luxury Frame Accent */}
      <div className="absolute inset-6 sm:inset-10 md:inset-16 pointer-events-none border border-[#8A929A]/25 rounded-2xl sm:rounded-3xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8A929A] rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8A929A] rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8A929A] rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8A929A] rounded-br-xl" />
      </div>

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-flex items-center justify-center"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#8A929A]/40 bg-[#FAF8F5]/80 backdrop-blur-md flex items-center justify-center shadow-xs">
            <span className="font-serif text-lg sm:text-xl text-[#8A5F42] tracking-wider font-semibold">
              Մ & Գ
            </span>
          </div>
        </motion.div>

        {/* Small Intro Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8A5F42] font-serif font-medium mb-3"
        >
          <div className="h-[1px] w-8 bg-[#8A929A]/40" />
          <span>{t.hero.saveTheDate}</span>
          <div className="h-[1px] w-8 bg-[#8A929A]/40" />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C1B18] tracking-wider leading-[1.15]">
            {groom}
          </h1>

          <div className="flex items-center justify-center my-1 sm:my-2 gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#8A929A]" />
            <span className="font-script text-3xl sm:text-5xl text-[#A87B5B] select-none">
              {t.hero.and}
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#8A929A]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1C1B18] tracking-wider leading-[1.15]">
            {bride}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-base sm:text-xl text-[#1C1B18]/75 tracking-wide max-w-lg mx-auto"
        >
          {t.hero.weAreGettingMarried}
        </motion.p>

        {/* Date & Location Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-3 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md border border-[#8A929A]/30 text-xs sm:text-sm font-serif text-[#1C1B18]/85 shadow-2xs"
        >
          <span className="flex items-center gap-1.5 font-medium text-[#8A5F42]">
            <Calendar className="w-4 h-4 text-[#A87B5B]" />
            <span>03.10.2026</span>
          </span>
          <span className="hidden sm:inline text-[#8A929A]/60">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#A87B5B]" />
            <span>Yerevan & Vagharshapat, Armenia</span>
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onRsvpClick}
            className="px-8 py-3.5 rounded-full bg-[#1C1B18] hover:bg-[#2E2D29] text-[#FAF8F5] font-serif text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C0C7D1] group-hover:rotate-12 transition-transform" />
            <span>{t.hero.btnRsvp}</span>
          </button>

          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-[#EDE7DC] border border-[#8A929A]/40 text-[#1C1B18] font-serif text-xs uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>{t.hero.btnDetails}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A5F42]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
