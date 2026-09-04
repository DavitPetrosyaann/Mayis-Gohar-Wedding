import React from 'react';
import { motion } from 'motion/react';
import { Heart, Quote } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useLanguage } from '../context/LanguageContext';

export const LoveStorySection: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const groom = language === 'en' ? WEDDING_COUPLE.groomEn : WEDDING_COUPLE.groom;
  const bride = language === 'en' ? WEDDING_COUPLE.brideEn : WEDDING_COUPLE.bride;

  return (
    <section
      id="love-story"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F3EFE6] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative subtle background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#A87B5B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#8A929A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-6"
        >
          <Heart className="w-3.5 h-3.5 text-[#A87B5B] fill-[#A87B5B]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
            {t.story.badge}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#A87B5B] fill-[#A87B5B]" />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1B18] tracking-wide mb-8"
        >
          {t.story.title}
        </motion.h2>

        {/* Animated Intertwined Gold Wedding Rings Graphic */}
        <div className="relative flex flex-col items-center justify-center my-8">
          {/* Subtle Ambient Golden Glow */}
          <motion.div
            animate={{
              scale: [0.95, 1.15, 0.95],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-36 h-36 bg-[#A87B5B]/20 rounded-full blur-2xl pointer-events-none"
          />

          {/* Floating and Tilting Rings Container */}
          <motion.div
            animate={{
              y: [0, -6, 0, -4, 0],
              rotate: [-1.5, 1.5, -1, 1, -1.5],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-44 h-28 flex items-center justify-center filter drop-shadow-md"
          >
            <svg
              viewBox="0 0 160 100"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Yellow Gold Gradient */}
                <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="25%" stopColor="#FBF0B9" />
                  <stop offset="50%" stopColor="#B8860B" />
                  <stop offset="75%" stopColor="#F5DE88" />
                  <stop offset="100%" stopColor="#8A6508" />
                </linearGradient>

                {/* Rose / Bronze Gold Gradient */}
                <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CD7F32" />
                  <stop offset="28%" stopColor="#FAD4B2" />
                  <stop offset="55%" stopColor="#A85D2F" />
                  <stop offset="80%" stopColor="#F2BA91" />
                  <stop offset="100%" stopColor="#783D1B" />
                </linearGradient>

                {/* Shimmer Sweep Gradient */}
                <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1C1B18" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Ring 1 - Classic Yellow Gold (Left) */}
              <circle
                cx="62"
                cy="50"
                r="30"
                stroke="url(#goldGradient1)"
                strokeWidth="7"
                filter="url(#ringShadow)"
              />
              <circle
                cx="62"
                cy="50"
                r="30"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Ring 2 - Rose Gold (Right, Intertwining) */}
              <circle
                cx="98"
                cy="50"
                r="30"
                stroke="url(#goldGradient2)"
                strokeWidth="7"
                filter="url(#ringShadow)"
              />
              <circle
                cx="98"
                cy="50"
                r="30"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* Interlocking Arc: Brings portion of Ring 1 over Ring 2 for 3D knot effect */}
              <path
                d="M 83 28 A 30 30 0 0 1 83 72"
                stroke="url(#goldGradient1)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M 83 28 A 30 30 0 0 1 83 72"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />

              {/* Diamond Solitaire Setting on the Right Ring */}
              <g transform="translate(98, 20)">
                {/* Diamond gem facet */}
                <polygon
                  points="0,-8 6,-3 4,4 -4,4 -6,-3"
                  fill="#E6F2F8"
                  stroke="#A0C4DE"
                  strokeWidth="0.8"
                />
                <polygon
                  points="0,-8 3,-3 0,4 -3,-3"
                  fill="#FFFFFF"
                  stroke="#C0DBEE"
                  strokeWidth="0.5"
                />
              </g>
            </svg>

            {/* Animated Twinkling Diamond Sparkle 1 */}
            <motion.div
              animate={{
                scale: [0, 1.25, 0],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: 'easeInOut',
              }}
              className="absolute top-1.5 right-8 pointer-events-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
                  fill="#FFF8DC"
                  className="filter drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                />
              </svg>
            </motion.div>

            {/* Animated Twinkling Sparkle 2 (Secondary on the left band) */}
            <motion.div
              animate={{
                scale: [0, 1.1, 0],
                opacity: [0, 0.9, 0],
                rotate: [0, -90, -180],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: 1.4,
                repeatDelay: 1.2,
                ease: 'easeInOut',
              }}
              className="absolute top-6 left-6 pointer-events-none"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z"
                  fill="#FFFFFF"
                  className="filter drop-shadow-[0_0_3px_rgba(255,255,255,0.9)]"
                />
              </svg>
            </motion.div>
          </motion.div>

          <p className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#8A5F42]/80 mt-2">
            03.10.2026 • Մայիս & Գոհար
          </p>
        </div>

        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-[#FAF8F5] border border-[#8A929A]/30 rounded-2xl p-6 sm:p-10 shadow-xs my-8"
        >
          <Quote className="w-8 h-8 text-[#8A929A]/40 mx-auto mb-4" />

          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#1C1B18] leading-relaxed italic font-normal">
            {t.story.quote}
          </p>

          <div className="h-[1px] w-24 bg-[#8A929A]/40 mx-auto my-6" />

          <div className="flex items-center justify-center gap-4">
            <span className="font-serif text-base sm:text-lg text-[#8A5F42] font-semibold tracking-wider">
              {groom}
            </span>
            <span className="font-script text-2xl text-[#A87B5B]">&</span>
            <span className="font-serif text-base sm:text-lg text-[#8A5F42] font-semibold tracking-wider">
              {bride}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
