import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { GalleryPhoto } from '../types';

export const MasonryGallery: React.FC = () => {
  const { masonryPhotos, addCustomPhotos } = usePhotos();
  const { t, isRtl } = useLanguage();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % masonryPhotos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + masonryPhotos.length) % masonryPhotos.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, masonryPhotos.length]);

  const activePhoto: GalleryPhoto | null =
    selectedPhotoIndex !== null ? masonryPhotos[selectedPhotoIndex] : null;

  return (
    <section
      id="masonry-gallery"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#F3EFE6] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto">
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              addCustomPhotos(e.target.files);
            }
          }}
        />

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.gallery.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1B18] tracking-wide">
            {t.gallery.title}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#1C1B18]/70 mt-2 max-w-lg mx-auto">
            {t.gallery.subtitle}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => uploadInputRef.current?.click()}
              className="px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#EDE7DC] border border-[#8A929A]/40 text-[#8A5F42] text-xs font-serif flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#A87B5B]" />
              <span>{t.gallery.uploadBtn}</span>
            </button>
          </div>
        </div>

        {/* Responsive Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px]">
          {masonryPhotos.map((photo, index) => {
            const isTall = index % 3 === 0 || index === 5;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-[#8A929A]/25 ${
                  isTall ? 'sm:row-span-2' : 'row-span-1'
                }`}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Luxury Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/85 via-[#1C1B18]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#E8E2D5]">
                      #{index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <h4 className="font-serif text-lg text-white font-medium">{photo.title}</h4>
                  <p className="font-serif text-xs text-[#FAF8F5]/80">{photo.caption}</p>
                </div>

                {/* Silver Frame Accent on Hover */}
                <div className="absolute inset-2 rounded-xl border border-[#C0C7D1]/0 group-hover:border-[#C0C7D1]/60 pointer-events-none transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#1C1B18]/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C0C7D1]" />
                <span className="font-serif text-sm tracking-wider text-[#E8E2D5]">
                  {String((selectedPhotoIndex ?? 0) + 1).padStart(2, '0')} /{' '}
                  {String(masonryPhotos.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <motion.div
              key={activePhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.alt}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl border border-[#8A929A]/40"
              />

              <div className="text-center mt-4 text-white max-w-lg">
                <h3 className="font-serif text-xl sm:text-2xl text-[#E8E2D5]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif text-[#FAF8F5]/80 mt-1">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
