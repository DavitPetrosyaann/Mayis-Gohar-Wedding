import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePhotos } from '../context/PhotoContext';
import { ScratchCard } from './ScratchCard';

export const ScratchOffSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const { carouselPhotos } = usePhotos();
  const [resetKey, setResetKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [customLotoPhotos, setCustomLotoPhotos] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mayis_gohar_loto_photos');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const defaultIcons = ['🏛️', '🎷', '👔', '💍'];

  // Default romantic wedding photos for the 4 scratch cards
  const defaultPhotos = [
    carouselPhotos[0]?.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    carouselPhotos[1]?.url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
    carouselPhotos[2]?.url || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
    carouselPhotos[3]?.url || 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop',
  ];

  const cards = t.scratch.cards.map((c, i) => ({
    ...c,
    icon: defaultIcons[i % defaultIcons.length],
  }));

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readFiles: File[] = (Array.from(files) as File[]).slice(0, 4);
    const readers = readFiles.map(
      (file: File) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((newPhotos) => {
      setCustomLotoPhotos(newPhotos);
      try {
        localStorage.setItem('mayis_gohar_loto_photos', JSON.stringify(newPhotos));
      } catch {
        // ignore
      }
      setResetKey((prev) => prev + 1);
    });
  };

  return (
    <section
      id="loto"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F5] relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white/80 shadow-xs mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.scratch.badge || 'Ինտերակտիվ Loto'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1B18] tracking-wide"
          >
            {t.scratch.title}
          </motion.h2>

          {t.scratch.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base font-serif text-[#1C1B18]/70 mt-3 max-w-xl mx-auto leading-relaxed"
            >
              {t.scratch.subtitle}
            </motion.p>
          )}

          {/* Action buttons: Reset all scratch cards & Upload custom photos */}
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-serif text-[#8A5F42] hover:text-[#1C1B18] transition-all border border-[#8A929A]/30 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.scratch.resetCards}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-serif text-[#8A5F42] hover:text-[#1C1B18] transition-all border border-[#8A929A]/30 shadow-xs cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Փոխել Loto-ի նկարները</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* 4 Scratch Cards Grid with photo reveal */}
        <div
          key={resetKey}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {cards.map((card, index) => {
            const photoUrl =
              customLotoPhotos[index] ||
              defaultPhotos[index % defaultPhotos.length];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-full"
              >
                <ScratchCard
                  card={card}
                  index={index}
                  photoUrl={photoUrl}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
