import React, { useState } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { HeaderPhotoCover } from './components/HeaderPhotoCover';
import { LoveStorySection } from './components/LoveStorySection';
import { CalendarCountdownSection } from './components/CalendarCountdownSection';
import { ScratchOffSection } from './components/ScratchOffSection';
import { PhotoCarousel } from './components/PhotoCarousel';
import { DailyTimeline } from './components/DailyTimeline';
import { RsvpSection } from './components/RsvpSection';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PhotoProvider } from './context/PhotoContext';
import { MusicProvider } from './context/MusicContext';

function WeddingAppContent() {
  const [isHeaderOpened, setIsHeaderOpened] = useState(false);
  const { isRtl } = useLanguage();

  const handleScrollTo = (id: string) => {
    if (!isHeaderOpened) {
      setIsHeaderOpened(true);
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleOpenHeader = () => {
    setIsHeaderOpened(true);
  };

  const handleScrollToContent = () => {
    const el = document.getElementById('love-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F3EFE6] text-[#1C1B18] font-serif antialiased selection:bg-[#A87B5B]/30 selection:text-[#1C1B18]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Navigation Bar with Integrated Music and Multilingual Selectors */}
      <NavigationHeader onScrollTo={handleScrollTo} />

      {/* Main Content Flow */}
      <main>
        {/* Section 1: Header Photo Cover with Click-to-Scale and Scroll-Lock */}
        <section id="header-cover">
          <HeaderPhotoCover
            isOpened={isHeaderOpened}
            onOpen={handleOpenHeader}
            onScrollToContent={handleScrollToContent}
          />
        </section>

        {/* Section 2: Welcome Message & Love Story */}
        <LoveStorySection />

        {/* Section 3: Calendar & Live Countdown */}
        <CalendarCountdownSection />

        {/* Section 4: Interactive Loto Scratch-Off Cards (Reveals Wedding Photos) */}
        <ScratchOffSection />

        {/* Section 5: Pre-Wedding Photo Gallery */}
        <PhotoCarousel />

        {/* Section 6: Daily Schedule / Timeline (Օրվա Ծրագիր) */}
        <DailyTimeline />

        {/* Section 7: Interactive RSVP Form with 'Նոր Հայտ' / 'New Request' submission */}
        <RsvpSection />
      </main>

      {/* Clean Minimalist Bottom Border Accent */}
      <footer className="py-8 bg-[#E8E2D5] border-t border-[#8A929A]/25 text-center">
        <p className="text-xs font-serif tracking-widest uppercase text-[#8A5F42]">
          Մ & Գ • 03.10.2026
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PhotoProvider>
        <MusicProvider>
          <WeddingAppContent />
        </MusicProvider>
      </PhotoProvider>
    </LanguageProvider>
  );
}
