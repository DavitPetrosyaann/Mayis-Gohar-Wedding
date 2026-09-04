import React, { useState } from 'react';
import { Heart, Share2, Calendar, Check, Phone } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Մայիս & Գոհար — Հարսանեկան Հրավեր',
      text: 'Սիրով հրավիրում ենք Ձեզ մեր հարսանյաց հանդեսին • 03.10.2026',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled or share failed
      }
    } else {
      // Fallback copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // ignore
      }
    }
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Հարսանիք • Մայիս և Գոհար');
    const details = encodeURIComponent('Սիրով հրավիրում ենք Ձեզ կիսելու մեր կյանքի լուսավոր օրը: Պսակադրություն՝ Սուրբ Հովհաննես Մկրտիչ եկեղեցի (Աբովյան) (15:00), Հարսանյաց սրահ՝ Աղաբաբյանս Մեծ Դահլիճ (17:30):');
    const location = encodeURIComponent('Սուրբ Հովհաննես Մկրտիչ եկեղեցի(Աբովյան) / Աղաբաբյանս Մեծ Դահլիճ, Երևան');
    const dates = '20261003T123000Z/20261003T210000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <footer className="relative py-20 px-4 sm:px-6 bg-[#1A1A1A] text-[#FDFBF7] overflow-hidden">
      {/* Decorative subtle border top */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Monogram */}
        <div className="inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 bg-white/5 flex items-center justify-center shadow-lg">
            <span className="font-serif text-xl text-[#F7E7CE] tracking-wider">
              Մ & Գ
            </span>
          </div>
        </div>

        {/* Closing Warm Note */}
        <div className="space-y-3">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wider">
            {WEDDING_COUPLE.closingNote}
          </h3>
          <p className="font-serif text-sm sm:text-base text-[#FDFBF7]/70 max-w-lg mx-auto leading-relaxed">
            Ձեր ներկայությունը մեր մեծագույն ուրախությունն է: Մինչ հանդիպում մեր սիրո տոնին:
          </p>
        </div>

        {/* Date & Couple Sign */}
        <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-serif text-[#D4AF37]">
          <span>{WEDDING_COUPLE.groom}</span>
          <Heart className="w-4 h-4 fill-[#E2A992] text-[#E2A992]" />
          <span>{WEDDING_COUPLE.bride}</span>
          <span className="text-white/30">•</span>
          <span className="text-white/90">{WEDDING_COUPLE.dateFormatted}</span>
        </div>

        {/* Share & Calendar Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShare}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-serif text-xs tracking-wider border border-white/20 transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Հղումը պատճենվեց</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Կիսվել Հրավիրատոմսով</span>
              </>
            )}
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#c49f2c] text-[#1A1A1A] font-serif text-xs font-medium tracking-wider transition-all flex items-center gap-2 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Ավելացնել Օրացույցում</span>
          </a>
        </div>

        {/* Contact info */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-serif text-white/50">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-[#D4AF37]" />
            <span>Հարցերի դեպքում՝ {WEDDING_COUPLE.primaryPhone}</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{WEDDING_COUPLE.hashtag}</span>
        </div>

        <p className="text-[11px] font-sans text-white/30 tracking-widest uppercase">
          03.10.2026 • Yerevan, Armenia
        </p>
      </div>
    </footer>
  );
};
