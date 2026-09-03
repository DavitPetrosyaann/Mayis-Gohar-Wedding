import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gift } from 'lucide-react';
import { SCRATCH_CARDS } from '../data/weddingData';
import { ScratchCard } from './ScratchCard';
import { useLanguage } from '../context/LanguageContext';

export const ScratchOffSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <section
      id="secrets"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F3EFE6] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient background accents */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-[#A87B5B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#8A929A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-3"
          >
            <Gift className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.scratch.badge}
            </span>
            <Gift className="w-3.5 h-3.5 text-[#A87B5B]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1B18] tracking-wide"
          >
            {t.scratch.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-serif text-[#1C1B18]/70 mt-2 max-w-lg mx-auto"
          >
            {t.scratch.subtitle}
          </motion.p>
        </div>

        {/* 4 Scratch Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {SCRATCH_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <ScratchCard card={card} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom instructions */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-serif text-[#8A5F42] bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#8A929A]/30 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span>{t.scratch.scratchToReveal}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
