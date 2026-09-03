import React, { useState, useRef } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { RealisticEnvelopeLauncher } from './components/RealisticEnvelopeLauncher';
import { HeroSection } from './components/HeroSection';
import { LoveStorySection } from './components/LoveStorySection';
import { CalendarCountdownSection } from './components/CalendarCountdownSection';
import { ScratchOffSection } from './components/ScratchOffSection';
import { PhotoCarousel } from './components/PhotoCarousel';
import { MasonryGallery } from './components/MasonryGallery';
import { DailyTimeline } from './components/DailyTimeline';
import { RsvpSection } from './components/RsvpSection';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PhotoProvider } from './context/PhotoContext';
import { MusicProvider } from './context/MusicContext';

function WeddingAppContent() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { isRtl } = useLanguage();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleEnvelopeOpened = () => {
    setIsEnvelopeOpened(true);
    // Smoothly scroll to the hero section after admiring the opened invitation reveal
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2800);
  };

  const handleEnvelopeReset = () => {
    setIsEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-[#F3EFE6] text-[#1C1B18] font-serif antialiased selection:bg-[#A87B5B]/30 selection:text-[#1C1B18]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Navigation Bar with Integrated Music and Multilingual Selectors */}
      <NavigationHeader onScrollTo={handleScrollTo} />

      {/* Main Content Flow */}
      <main className="pt-16 sm:pt-20">
        {/* Section 1: 3D Interactive Envelope with Smooth Realistic Physics */}
        <section id="envelope">
          <RealisticEnvelopeLauncher
            isOpened={isEnvelopeOpened}
            onOpen={handleEnvelopeOpened}
            onReset={handleEnvelopeReset}
            onScrollToContent={() => handleScrollTo('hero')}
          />
        </section>

        {/* Section 2: Header / Hero Section */}
        <div id="hero" ref={heroRef}>
          <HeroSection
            onRsvpClick={() => handleScrollTo('rsvp')}
            onExploreClick={() => handleScrollTo('love-story')}
          />
        </div>

        {/* Section 3: Welcome Message & Love Story */}
        <LoveStorySection />

        {/* Section 4: Calendar & Live Countdown */}
        <CalendarCountdownSection />

        {/* Section 5: Scratch-Off Box */}
        <ScratchOffSection />

        {/* Section 6: Pre-Wedding Photo Carousel */}
        <PhotoCarousel />

        {/* Section 7: Masonry Photo Grid & Lightbox */}
        <MasonryGallery />

        {/* Section 8: Daily Schedule / Timeline (Օրվա Ծրագիր) */}
        <DailyTimeline />

        {/* Section 9: Interactive RSVP Form with Dynamic Field Visibility & Max 10 Guests */}
        <RsvpSection />
      </main>

      {/* Clean Minimalist Bottom Border Accent (Removed redundant footer invitation text as requested) */}
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
