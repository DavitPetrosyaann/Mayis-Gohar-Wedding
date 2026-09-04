import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Heart, Download, ExternalLink } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useCountdown } from '../hooks/useCountdown';
import { useLanguage } from '../context/LanguageContext';

export const CalendarCountdownSection: React.FC = () => {
  const timeLeft = useCountdown(WEDDING_COUPLE.targetDateISO);
  const { t, isRtl } = useLanguage();

  // Calendar configuration for October 2026
  // Oct 1, 2026 is Thursday.
  const emptyDaysBefore = 3;
  const daysInOctober = 31;
  const calendarDays = Array.from({ length: daysInOctober }, (_, i) => i + 1);

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Հարսանիք • Մայիս և Գոհար');
    const details = encodeURIComponent(
      'Սիրով հրավիրում ենք Ձեզ կիսելու մեր կյանքի լուսավոր օրը: Պսակադրություն՝ Սուրբ Հովհաննես Մկրտիչ եկեղեցի (Աբովյան) (15:00), Հարսանյաց սրահ՝ Աղաբաբյանս Մեծ Դահլիճ (17:30):'
    );
    const location = encodeURIComponent(
      'Սուրբ Հովհաննես Մկրտիչ եկեղեցի(Աբովյան) / Աղաբաբյանս Մեծ Դահլիճ, Երևան'
    );
    const dates = '20261003T123000Z/20261003T210000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate .ics download
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mayis & Gohar//Wedding Invitation//HY',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Հարսանիք • Մայիս և Գոհար',
      'DESCRIPTION:Հարսանեկան արարողություն և շքեղ հանդիսություն',
      'LOCATION:Սուրբ Հովհաննես Մկրտիչ եկեղեցի(Աբովյան) & Աղաբաբյանս Մեծ Դահլիճ',
      'DTSTART:20261003T123000Z',
      'DTEND:20261003T210000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Mayis_and_Gohar_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const countdownUnits = [
    { label: t.calendar.daysLabel, value: timeLeft.days },
    { label: t.calendar.hoursLabel, value: timeLeft.hours },
    { label: t.calendar.minutesLabel, value: timeLeft.minutes },
    { label: t.calendar.secondsLabel, value: timeLeft.seconds },
  ];

  return (
    <section
      id="calendar"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F5] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-3"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.calendar.badge}
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1B18] tracking-wide">
            {t.calendar.title}
          </h2>
          {t.calendar.subtitle ? (
            <p className="text-xs sm:text-sm font-serif text-[#1C1B18]/70 mt-1">
              {t.calendar.subtitle}
            </p>
          ) : null}
        </div>

        {/* Live Countdown Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {countdownUnits.map((unit, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#8A929A]/30 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-[#A87B5B] transition-all duration-300"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8A929A] via-[#A87B5B] to-[#8A929A] opacity-70" />
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1B18] tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-serif text-xs sm:text-sm text-[#8A5F42] font-semibold mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-serif text-[#1C1B18]/70">
            <Clock className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span>{t.calendar.countdownTitle}</span>
          </div>
        </motion.div>

        {/* Styled Monthly Calendar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#8A929A]/30 max-w-xl mx-auto"
        >
          {/* Month & Year Title */}
          <div className="flex items-center justify-between pb-6 border-b border-[#8A929A]/20 mb-6 relative">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B18]">
                {t.calendar.monthYear}
              </h3>
              <p className="text-xs font-serif text-[#8A5F42] tracking-wider uppercase font-semibold">
                03.10.2026
              </p>
            </div>

            {/* Moving Animated Heart Icon Badge */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1, 1.12, 1],
                y: [0, -4, 0, -2, 0],
                rotate: [-5, 5, -3, 3, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-12 h-12 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] flex items-center justify-center shadow-xs relative"
            >
              <Heart className="w-5 h-5 text-[#A87B5B] fill-[#A87B5B]" />
              {/* Soft mini halo */}
              <motion.div
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full border border-[#A87B5B]/50"
              />
            </motion.div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-3">
            {t.calendar.daysShort.map((dayName, idx) => (
              <div
                key={idx}
                className="py-1 text-xs font-serif font-semibold text-[#8A5F42] uppercase tracking-wider"
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {/* Empty slots before day 1 */}
            {Array.from({ length: emptyDaysBefore }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day) => {
              const isWeddingDay = day === 3;

              return (
                <div
                  key={`day-${day}`}
                  className="aspect-square flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 4px 10px rgba(168, 123, 91, 0.25)',
                          '0 8px 22px rgba(168, 123, 91, 0.45)',
                          '0 4px 10px rgba(168, 123, 91, 0.25)',
                        ],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative w-full h-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#A87B5B] to-[#8A5F42] text-[#FAF8F5] shadow-md border border-[#C0C7D1]/50 font-serif overflow-visible z-10"
                    >
                      <span className="text-base sm:text-lg font-bold leading-none">{day}</span>
                      {/* Moving floating heart inside wedding date */}
                      <motion.div
                        animate={{
                          y: [0, -3.5, 0, -2, 0],
                          scale: [1, 1.3, 1, 1.15, 1],
                          rotate: [-6, 6, -3, 3, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="mt-0.5"
                      >
                        <Heart className="w-3 h-3 fill-[#FAF8F5] text-[#FAF8F5] drop-shadow-xs" />
                      </motion.div>

                      {/* Gentle pulsating glow ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 rounded-xl border-2 border-[#A87B5B] pointer-events-none"
                      />
                    </motion.div>
                  ) : (
                    <span
                      className={`text-xs sm:text-sm font-serif ${
                        day % 7 === 3 || day % 7 === 4
                          ? 'text-[#1C1B18]/50'
                          : 'text-[#1C1B18]/85'
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Action Buttons */}
          <div className="mt-8 pt-6 border-t border-[#8A929A]/20 flex flex-wrap items-center justify-center gap-3">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1C1B18] hover:bg-[#2E2D29] text-[#FAF8F5] text-xs font-serif tracking-wider flex items-center gap-2 shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C0C7D1]" />
              <span>{t.calendar.addToCalendar}</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              className="px-5 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#EDE7DC] border border-[#8A929A]/40 text-[#8A5F42] text-xs font-serif tracking-wider flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#A87B5B]" />
              <span>Apple / Outlook (.ics)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
