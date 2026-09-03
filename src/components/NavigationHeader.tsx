import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Globe, Volume2, VolumeX, Check } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useLanguage, Language } from '../context/LanguageContext';
import { useMusic } from '../context/MusicContext';

interface NavigationHeaderProps {
  onScrollTo: (id: string) => void;
}

const LANGUAGES: { code: Language; name: string; flag: string; short: string }[] = [
  { code: 'hy', name: 'Հայերեն', flag: '🇦🇲', short: 'ՀԱՅ' },
  { code: 'en', name: 'English', flag: '🇬🇧', short: 'ENG' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', short: 'РУС' },
  { code: 'ka', name: 'ქართული', flag: '🇬🇪', short: 'ქარ' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', short: 'عرب' },
];

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({ onScrollTo }) => {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const { isPlaying, toggleMusic } = useMusic();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'envelope', label: t.nav.envelope },
    { id: 'love-story', label: t.nav.story },
    { id: 'calendar', label: t.nav.calendar },
    { id: 'secrets', label: t.nav.secrets },
    { id: 'carousel-gallery', label: t.nav.photos },
    { id: 'timeline', label: t.nav.timeline },
    { id: 'rsvp', label: t.nav.rsvp },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/92 backdrop-blur-md shadow-xs border-b border-[#8A929A]/20 py-2 sm:py-2.5'
          : 'bg-transparent py-3.5 sm:py-4'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#8A929A]/40 bg-[#FAF8F5]/90 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            <span className="font-serif text-xs font-bold text-[#8A5F42]">Մ&Գ</span>
          </div>
          <span className="font-serif text-xs sm:text-sm tracking-widest text-[#1C1B18] font-medium hidden sm:inline">
            {language === 'en'
              ? `${WEDDING_COUPLE.groomEn} & ${WEDDING_COUPLE.brideEn}`
              : `${WEDDING_COUPLE.groom} & ${WEDDING_COUPLE.bride}`}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-xs font-serif uppercase tracking-widest text-[#1C1B18]/75 hover:text-[#8A5F42] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Controls: Music, Language Selector, and RSVP */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* 1. Music Toggle Icon Button */}
          <button
            onClick={toggleMusic}
            title={isPlaying ? t.music.pause : t.music.play}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              isPlaying
                ? 'bg-[#8A5F42]/10 border-[#8A5F42] text-[#8A5F42] shadow-2xs'
                : 'bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border-[#8A929A]/30 text-[#1C1B18]/70 hover:text-[#1C1B18]'
            }`}
            aria-label="Toggle Background Music"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#8A5F42] animate-pulse" />
                <span className="hidden xs:inline text-[11px] font-serif font-medium tracking-wide">
                  {t.music.melody}
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#8A5F42] animate-ping" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden xs:inline text-[11px] font-serif tracking-wide">
                  {t.music.melody}
                </span>
              </>
            )}
          </button>

          {/* 2. Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#8A929A]/35 text-[#1C1B18] text-xs font-serif transition-all duration-200 cursor-pointer shadow-2xs"
              title="Change Language / Փոխել Լեզուն"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#8A5F42]" />
              <span className="text-xs">{currentLang.flag}</span>
              <span className="font-sans text-[11px] font-semibold tracking-wider">
                {currentLang.short}
              </span>
            </button>

            {/* Dropdown Menu */}
            {langMenuOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-44 bg-[#FAF8F5] border border-[#8A929A]/30 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150`}
              >
                <div className="px-3 py-1 border-b border-[#8A929A]/15 text-[10px] font-serif uppercase tracking-widest text-[#8A5F42]">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs font-serif transition-colors cursor-pointer ${
                      language === lang.code
                        ? 'bg-[#8A5F42]/10 text-[#8A5F42] font-semibold'
                        : 'text-[#1C1B18]/80 hover:bg-[#FAF8F5]/60 hover:text-[#1C1B18]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-[#8A5F42]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. RSVP Quick Button */}
          <button
            onClick={() => handleNavClick('rsvp')}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1C1B18] hover:bg-[#2E2D29] text-[#FAF8F5] font-serif text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#C0C7D1]" />
            <span>RSVP</span>
          </button>

          {/* 4. Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-full bg-[#FAF8F5]/80 border border-[#8A929A]/30 flex items-center justify-center text-[#1C1B18] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#8A929A]/20 px-6 py-5 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-serif text-sm text-[#1C1B18] py-1 border-b border-[#8A929A]/15 flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="text-[#8A5F42] text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
