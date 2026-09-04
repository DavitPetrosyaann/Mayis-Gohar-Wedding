import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Navigation, Church, Wine, Home, HeartHandshake, Sparkles } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/weddingData';
import { TimelineItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const DailyTimeline: React.FC = () => {
  const { t, language, isRtl } = useLanguage();

  const getTimelineIcon = (iconType: TimelineItem['icon']) => {
    switch (iconType) {
      case 'groom':
        return <Home className="w-5 h-5 text-[#8A5F42]" />;
      case 'bride':
        return <HeartHandshake className="w-5 h-5 text-[#A87B5B]" />;
      case 'church':
        return <Church className="w-5 h-5 text-[#8A929A]" />;
      case 'hall':
        return <Wine className="w-5 h-5 text-[#8A5F42]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C0C7D1]" />;
    }
  };

  return (
    <section
      id="timeline"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF8F5] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-3">
            <Clock className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.timeline.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1B18] tracking-wide">
            {t.timeline.title}
          </h2>
          {t.timeline.subtitle ? (
            <p className="text-xs sm:text-sm font-serif text-[#1C1B18]/70 mt-2 max-w-md mx-auto">
              {t.timeline.subtitle}
            </p>
          ) : null}
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Vertical central connector line */}
          <div className="absolute top-6 bottom-6 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#8A929A]/40 via-[#A87B5B] to-[#8A929A]/40" />

          <div className="space-y-10 sm:space-y-12">
            {TIMELINE_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Timeline Badge Node (Center on Desktop, Left on Mobile) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF8F5] border-2 border-[#8A929A] shadow-md flex items-center justify-center z-20">
                    {getTimelineIcon(item.icon)}
                  </div>

                  {/* Left Side Content */}
                  <div
                    className={`w-full md:w-[44%] pl-16 md:pl-0 ${
                      isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    }`}
                  >
                    <div
                      className={`p-6 sm:p-7 rounded-2xl bg-white shadow-md border transition-all duration-300 ${
                        item.highlight
                          ? 'border-[#A87B5B] shadow-lg ring-1 ring-[#A87B5B]/30'
                          : 'border-[#8A929A]/30 hover:border-[#A87B5B]/50'
                      }`}
                    >
                      {/* Time & Category Pill */}
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#8A5F42] tracking-wide">
                          {item.time}
                        </span>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#1C1B18]/40">
                          {item.titleEn}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1C1B18] font-medium tracking-wide mb-1">
                        {language === 'en' ? item.titleEn : item.titleHy}
                      </h3>

                      {/* Location Name & Address */}
                      <div
                        className={`flex items-start gap-1.5 text-xs text-[#1C1B18]/80 font-serif mb-3 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#A87B5B] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-[#1C1B18] block">{item.locationName}</span>
                          {item.address ? <span className="text-[#1C1B18]/60 block">{item.address}</span> : null}
                        </div>
                      </div>

                      {/* Description */}
                      {item.description ? (
                        <p className="font-serif text-xs sm:text-sm text-[#1C1B18]/75 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      ) : null}

                      {/* Google Maps External Link Button */}
                      <div>
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all duration-200 shadow-2xs ${
                            item.highlight
                              ? 'bg-[#1C1B18] text-white hover:bg-[#333]'
                              : 'bg-[#FAF8F5] text-[#1C1B18] hover:bg-[#EDE7DC] border border-[#8A929A]/30'
                          }`}
                        >
                          <Navigation className="w-3.5 h-3.5 text-[#A87B5B]" />
                          <span>{t.timeline.viewOnMap}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
