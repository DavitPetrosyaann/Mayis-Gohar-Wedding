import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronDown, RotateCcw } from 'lucide-react';
import { WEDDING_COUPLE } from '../data/weddingData';
import { useLanguage } from '../context/LanguageContext';

interface EnvelopeLauncherProps {
  isOpened?: boolean;
  onOpen?: () => void;
  onReset?: () => void;
  onScrollToContent?: () => void;
}

// Hand pointer cursor icon pointing at the seal in the initial state
const SealPointerHint: React.FC<{ label: string }> = ({ label }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: [8, 0, 8] }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{
      opacity: { duration: 0.4 },
      y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
    }}
    className="absolute left-1/2 -translate-x-1/2 top-16 pointer-events-none flex flex-col items-center gap-1.5 z-50"
  >
    <svg
      width="34"
      height="34"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_4px_10px_rgba(28,27,24,0.45)]"
    >
      <path
        d="M10 2v14.5l-3.2-3.2a2.3 2.3 0 0 0-3.3 3.3l7 7C12.5 25.5 15.5 28 20 28h3a5 5 0 0 0 5-5v-8a2 2 0 0 0-2-2 2 2 0 0 0-2-2 2 2 0 0 0-2-2h-1V6a2 2 0 0 0-4 0v2a2 2 0 0 0-2-2V2a2 2 0 0 0-4 0z"
        fill="#FFFFFF"
        stroke="#1C1B18"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="px-2.5 py-0.5 rounded-full bg-[#1C1B18]/90 text-[#FAF8F5] text-[11px] font-serif tracking-wider shadow-lg whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

// Antique Bronze & Rose-Gold Wax Seal with embossed monogram "Մ & Գ"
const BronzeWaxSeal: React.FC<{
  size?: number;
}> = ({ size = 76 }) => {
  return (
    <div
      className="relative select-none group"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_18px_rgba(28,27,24,0.45)] group-hover:drop-shadow-[0_10px_24px_rgba(168,123,91,0.65)] transition-all duration-300"
      >
        <defs>
          <linearGradient id="sealBronzeGrad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#D9A384" />
            <stop offset="25%" stopColor="#BA8362" />
            <stop offset="65%" stopColor="#935E3E" />
            <stop offset="100%" stopColor="#693B20" />
          </linearGradient>

          <linearGradient id="sealInnerDep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E4C2F" />
            <stop offset="50%" stopColor="#9E6848" />
            <stop offset="100%" stopColor="#5A3219" />
          </linearGradient>

          <radialGradient id="sealRimReflect" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E4C4B2" />
            <stop offset="70%" stopColor="#A47253" />
            <stop offset="100%" stopColor="#6E4025" />
          </radialGradient>

          <linearGradient id="sealSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#E4C4B2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Organic Molten Wax Outline */}
        <path
          d="M50 4 
             C63 3, 76 8, 86 18 
             C94 26, 98 38, 97 50 
             C96 64, 91 75, 81 85 
             C71 95, 58 98, 47 96 
             C35 94, 22 91, 14 81 
             C5 71, 3 57, 5 45 
             C7 31, 14 19, 25 11 
             C33 5, 42 5, 50 4 Z"
          fill="url(#sealBronzeGrad)"
        />

        {/* Highlighting shine */}
        <path
          d="M26 13 C35 7, 52 5, 68 8 C80 11, 88 18, 91 25 C82 17, 65 12, 48 12 C34 12, 23 16, 17 21 C18 17, 21 14, 26 13 Z"
          fill="url(#sealSheen)"
          opacity="0.65"
        />

        {/* Inner Depressed Center */}
        <circle cx="50" cy="50" r="38" fill="url(#sealInnerDep)" />

        {/* Beaded rim ring */}
        <circle
          cx="50"
          cy="50"
          r="36.5"
          fill="none"
          stroke="url(#sealRimReflect)"
          strokeWidth="1.8"
          strokeDasharray="2.5, 2.5"
          opacity="0.85"
        />

        {/* Embossed Armenian Monogram "Մ & Գ" */}
        <circle cx="50" cy="50" r="31.5" fill="url(#sealBronzeGrad)" />
        <text
          x="50"
          y="53.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FDF9F5"
          style={{
            fontFamily: '"Noto Serif Armenian", "Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: '20px',
            letterSpacing: '1px',
          }}
          className="drop-shadow-[0_1.5px_2px_rgba(25,10,5,0.95)]"
        >
          Մ & Գ
        </text>
      </svg>
    </div>
  );
};

export const RealisticEnvelopeLauncher: React.FC<EnvelopeLauncherProps> = ({
  isOpened = false,
  onOpen,
  onReset,
  onScrollToContent,
}) => {
  const { language } = useLanguage();

  // Animation Sequence Phases:
  // 'closed' -> Seal visible, top flap closed (0deg), card hidden inside pocket (translateY 0%)
  // 'opening-flap' -> Seal faded, flap rotating to -180deg (switching z-index behind when past -90deg)
  // 'sliding-card' -> Flap fully open, card sliding vertically out of the pocket (translateY -80%)
  // 'revealed' -> Card scaled up, celebration confetti, option to scroll down or replay
  const [phase, setPhase] = useState<'closed' | 'opening-flap' | 'sliding-card' | 'revealed'>(
    isOpened ? 'revealed' : 'closed'
  );

  // Tracks whether the top flap has flipped past -90deg to sit behind the card
  const [flapBehind, setFlapBehind] = useState<boolean>(isOpened);

  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  // Sync external opened state
  useEffect(() => {
    if (isOpened && phase === 'closed') {
      setFlapBehind(true);
      setPhase('revealed');
    } else if (!isOpened && phase !== 'closed') {
      setFlapBehind(false);
      setPhase('closed');
    }
  }, [isOpened]);

  // Single continuous 60fps sequence triggered ONLY by clicking the Wax Seal
  const handleSealClick = () => {
    if (phase !== 'closed') return;
    clearTimeouts();

    // Step A & B: Dissolve seal & begin Top Flap 3D rotation
    setPhase('opening-flap');
    setFlapBehind(false);

    // Delicate seal shimmer particles
    confetti({
      particleCount: 16,
      spread: 45,
      origin: { y: 0.46 },
      colors: ['#BA8362', '#D9A384', '#935E3E', '#FAF8F5'],
      disableForReducedMotion: true,
    });

    // Step C: When flap reaches -90deg (~400ms), switch z-index to behind the card
    const tFlapBehind = setTimeout(() => {
      setFlapBehind(true);
    }, 420);
    timeoutIds.current.push(tFlapBehind);

    // Step D: Once flap completes full 180deg flip (~800ms), slide card vertically out of pocket
    const tSlideCard = setTimeout(() => {
      setPhase('sliding-card');
    }, 850);
    timeoutIds.current.push(tSlideCard);

    // Step E: Full card reveal & scale-up (~1800ms)
    const tReveal = setTimeout(() => {
      setPhase('revealed');

      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.38 },
        colors: ['#BA8362', '#C0C7D1', '#FAF8F5', '#8A5F42', '#EDE5D8'],
        disableForReducedMotion: true,
      });

      onOpen?.();
    }, 1800);
    timeoutIds.current.push(tReveal);
  };

  // Re-seal animation sequence
  const handleReset = () => {
    clearTimeouts();
    setPhase('sliding-card');

    const t1 = setTimeout(() => {
      setFlapBehind(false);
      setPhase('closed');
      onReset?.();
    }, 500);
    timeoutIds.current.push(t1);
  };

  // Scroll smoothly down to the wedding details
  const handleExplore = () => {
    if (onScrollToContent) {
      onScrollToContent();
    } else {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isFlapOpen = phase !== 'closed';
  const isCardSlidOut = phase === 'sliding-card' || phase === 'revealed';
  const isRevealed = phase === 'revealed';

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-center py-10 sm:py-16 px-4 bg-[#F4F0E8] select-none overflow-hidden">
      {/* Soft Ambient Depth Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-[#A87B5B]/10 via-[#C0C7D1]/12 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] flex flex-col items-center">
        {/* Title above envelope */}
        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-[#8A5F42] font-serif font-semibold"
          >
            {language === 'hy' ? 'Հարսանեկան Հրավիրատոմս' : 'Wedding Invitation'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl sm:text-3xl font-serif text-[#1C1B18] mt-1 tracking-wide"
          >
            {language === 'en' ? `${WEDDING_COUPLE.groomEn} & ${WEDDING_COUPLE.brideEn}` : 'Մայիս & Գոհար'}
          </motion.h2>
        </div>

        {/* 3D Perspective Envelope Canvas */}
        <div
          className="relative w-full pt-36 sm:pt-40 pb-4 flex items-center justify-center"
          style={{ perspective: 1000 }}
        >
          {/* Envelope Container (Width: 100%, Height: 240px / 270px) */}
          <div
            className="relative w-full h-[240px] sm:h-[270px] rounded-2xl shadow-[0_20px_45px_-10px_rgba(28,27,24,0.25)]"
            style={{
              backgroundColor: '#EDE5D8',
              backgroundImage: 'linear-gradient(135deg, #F8F3EB 0%, #EDE5D8 50%, #E2D9CB 100%)',
              border: '1px solid rgba(138, 146, 154, 0.35)',
            }}
          >
            {/* =========================================================================
                LAYER 1 (BACK): Envelope Interior Back Wall + Opened Flap (when rotated)
               ========================================================================= */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
              style={{
                zIndex: 1,
                backgroundColor: '#E3D8C8',
                backgroundImage: 'linear-gradient(to bottom, #ECE4D6 0%, #DDD1BF 100%)',
              }}
            />

            {/* Top Triangular Flap:
                - Origin at top center: Axis of rotation is the top horizontal line
                - Closed: Inverted triangle with base at top edge (0,0)-(100,0) and apex pointing DOWN towards wax seal (50,100) (v)
                - Open: Rotated 180deg (rotateX(180deg)), apex points STRICTLY UP towards navigation bar / top of page (^)
                - z-index: 30 when closed, switches to 1 when opened past 90deg (sits behind the card and envelope back)
            */}
            <motion.div
              className={`envelope-top-flap absolute inset-x-0 top-0 h-1/2 cursor-pointer ${isFlapOpen ? 'open' : ''}`}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                zIndex: flapBehind ? 1 : 30,
                backfaceVisibility: 'visible',
                WebkitBackfaceVisibility: 'visible',
              }}
              initial={false}
              animate={{
                rotateX: isFlapOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={handleSealClick}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
                style={{
                  filter: isFlapOpen
                    ? 'drop-shadow(0 -4px 6px rgba(28, 27, 24, 0.12))'
                    : 'drop-shadow(0 3px 5px rgba(28, 27, 24, 0.12))',
                }}
              >
                <defs>
                  <linearGradient id="flapOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F9F5EE" />
                    <stop offset="65%" stopColor="#ECE4D7" />
                    <stop offset="100%" stopColor="#E0D7C9" />
                  </linearGradient>
                  <linearGradient id="flapInnerLining" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FAF5EC" />
                    <stop offset="100%" stopColor="#DDD2C1" />
                  </linearGradient>
                </defs>

                {/* Base paper polygon:
                    - Closed: Base (0,0)-(100,0) at top, Apex (50,100) pointing DOWN (v)
                    - Open: Base (0,0)-(100,0) stays at fold line, Apex flips to (50,-100) pointing STRAIGHT UP (^)
                */}
                <polygon
                  points="0,0 100,0 50,100"
                  fill="url(#flapOuterGrad)"
                  stroke="rgba(138, 146, 154, 0.35)"
                  strokeWidth="0.8"
                />

                {/* Subtle luxury inner border lining */}
                <polygon
                  points="4,2 96,2 50,94"
                  fill="url(#flapInnerLining)"
                  stroke="rgba(168, 123, 91, 0.22)"
                  strokeWidth="0.6"
                />
              </svg>
            </motion.div>

            {/* =========================================================================
                LAYER 2 (MIDDLE): The Invitation Card (slides vertically on Y-axis)
               ========================================================================= */}
            <motion.div
              className="absolute inset-x-3 sm:inset-x-4 top-3 h-[220px] sm:h-[250px] rounded-xl flex flex-col justify-center items-center p-4 sm:p-5 text-center cursor-pointer select-none"
              style={{
                zIndex: 10,
                backgroundColor: '#FAF8F5',
                backgroundImage: 'radial-gradient(ellipse at top, #FFFFFF 0%, #FAF8F5 80%, #F3EEE6 100%)',
              }}
              initial={false}
              animate={{
                y: isCardSlidOut ? '-80%' : '0%',
                scale: isRevealed ? 1.05 : 0.98,
                boxShadow: isCardSlidOut
                  ? '0 24px 50px -12px rgba(28, 27, 24, 0.32), 0 0 0 1px rgba(186, 131, 98, 0.4)'
                  : '0 4px 10px -2px rgba(0, 0, 0, 0.08)',
              }}
              transition={{
                y: {
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                },
                scale: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              onClick={() => {
                if (phase === 'closed') handleSealClick();
                else if (isCardSlidOut) handleExplore();
              }}
            >
              {/* Double Inset Luxury Border */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-lg border border-[#A87B5B]/40 pointer-events-none">
                <div className="absolute inset-0.5 border border-[#C0C7D1]/30 rounded-md" />
              </div>

              {/* Card Typographic Content */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 py-2">
                <h3
                  className="font-serif text-2xl sm:text-3xl text-[#7A5338] tracking-wide font-normal leading-snug"
                  style={{ fontFamily: '"Noto Serif Armenian", "Cormorant Garamond", serif' }}
                >
                  {language === 'en'
                    ? `${WEDDING_COUPLE.groomEn} & ${WEDDING_COUPLE.brideEn}`
                    : 'Մայիս & Գոհար'}
                </h3>

                <p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#A87B5B] font-serif font-semibold pt-0.5">
                  {language === 'en' ? 'WEDDING INVITATION' : 'ՀՐԱՎԻՐԱՏՈՄՍ'}
                </p>

                <p className="text-xs sm:text-sm font-serif text-[#8A5F42]/90 tracking-widest pt-1">
                  03.10.2026
                </p>
              </div>
            </motion.div>

            {/* =========================================================================
                LAYER 3 (FRONT): Envelope Front Pocket (Left, Right, Bottom Triangular Flaps)
               ========================================================================= */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              {/* Opaque underlay base to prevent see-through glitches */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl"
                style={{
                  backgroundColor: '#E4DBD0',
                  backgroundImage: 'linear-gradient(to top, #DBD2C6 0%, #EDE6DA 100%)',
                }}
              />

              {/* Left Triangle Flap */}
              <div
                className="absolute inset-y-0 left-0 w-1/2"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                  backgroundColor: '#E9E2D4',
                  backgroundImage: 'linear-gradient(115deg, #F5EFE5 0%, #E4DCCE 100%)',
                  filter: 'drop-shadow(2px 0 3px rgba(0, 0, 0, 0.06))',
                }}
              />

              {/* Right Triangle Flap */}
              <div
                className="absolute inset-y-0 right-0 w-1/2"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
                  backgroundColor: '#E6DFD1',
                  backgroundImage: 'linear-gradient(245deg, #F5EFE5 0%, #DFD7C9 100%)',
                  filter: 'drop-shadow(-2px 0 3px rgba(0, 0, 0, 0.06))',
                }}
              />

              {/* Bottom Triangle Flap (pointing UP toward center) */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                  backgroundColor: '#E2DAD0',
                  backgroundImage: 'linear-gradient(to top, #DCD3C6 0%, #EDE6DB 75%, #E3D9CD 100%)',
                  filter: 'drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.08))',
                }}
              />
            </div>

            {/* =========================================================================
                LAYER 4 (TOPMOST OVERLAY): Wax Seal with "Մ & Գ" (Clickable)
               ========================================================================= */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 40 }}
            >
              <AnimatePresence>
                {phase === 'closed' && (
                  <motion.div
                    key="wax-seal"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      filter: 'blur(3px)',
                      transition: { duration: 0.35, ease: 'easeOut' },
                    }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleSealClick}
                    className="relative cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label="Open wedding invitation with wax seal"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSealClick();
                      }
                    }}
                  >
                    <BronzeWaxSeal size={76} />

                    {/* Subtle pulsing glow ring around seal */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#BA8362]/40 pointer-events-none"
                      animate={{ scale: [1, 1.22, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Hand pointer hint prompting user to click */}
                    <SealPointerHint
                      label={language === 'hy' ? 'Սեղմեք Կնիքին' : 'Click Seal'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Controls (Clean, Minimal, only displayed when revealed) */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {phase === 'closed' ? (
            <button
              onClick={handleSealClick}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8A5F42] via-[#BA8362] to-[#8A5F42] hover:brightness-105 active:scale-95 text-[#FAF8F5] font-serif text-xs uppercase tracking-[0.2em] shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FAF8F5]" />
              <span>{language === 'hy' ? 'Բացել Ծրարը' : 'Open Envelope'}</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={handleExplore}
                className="px-6 py-2.5 rounded-full bg-[#1C1B18] hover:bg-[#2E2D29] active:scale-95 text-[#FAF8F5] font-serif text-xs tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>{language === 'hy' ? 'Շարունակել դեպի Ծրագիր' : 'Explore Wedding'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C0C7D1] animate-bounce" />
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#F3EFE6] active:scale-95 border border-[#8A929A]/40 text-[#1C1B18] font-serif text-xs tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title={language === 'hy' ? 'Կրկին ծրարել' : 'Replay animation'}
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8A5F42]" />
                <span>{language === 'hy' ? 'Կրկին Ծրարել' : 'Replay'}</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Also export EnvelopeLauncher as an alias
export const EnvelopeLauncher = RealisticEnvelopeLauncher;
export default RealisticEnvelopeLauncher;
