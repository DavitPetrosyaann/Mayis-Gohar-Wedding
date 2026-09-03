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

        {/* Intertwined Armenian Antique Silver & Bronze Rings Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center my-6"
        >
          <div className="relative flex items-center justify-center">
            {/* Ring 1 - Silver */}
            <div className="w-12 h-12 rounded-full border-2 border-[#C0C7D1] shadow-sm transform -rotate-12 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full border border-[#C0C7D1]/40" />
            </div>
            {/* Ring 2 - Terracotta/Bronze */}
            <div className="w-12 h-12 rounded-full border-2 border-[#A87B5B] shadow-sm -ml-4 transform rotate-12 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full border border-[#A87B5B]/40" />
            </div>
          </div>
        </motion.div>

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

          <p className="font-serif text-sm sm:text-base text-[#1C1B18]/80 leading-loose max-w-xl mx-auto">
            {t.story.p1}
          </p>
          <p className="font-serif text-sm sm:text-base text-[#1C1B18]/80 leading-loose max-w-xl mx-auto mt-2">
            {t.story.p2}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
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
