import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Play a soft romantic harp/piano-like arpeggio using Web Audio API
  const playRomanticChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic chord notes in Hz (Pentatonic / Major 7th warmth: C - E - G - B - D - E)
      const chordProgression: number[][] = [
        [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
        [220.00, 261.63, 329.63, 392.00, 523.25], // Am9
        [174.61, 220.00, 261.63, 329.63, 440.00], // Fmaj7
        [196.00, 246.94, 293.66, 392.00, 493.88], // Gsus4 -> G
      ];

      let chordIndex = 0;

      const playNextChord = () => {
        if (!isLoopingRef.current || !audioCtxRef.current) return;
        const now = ctx.currentTime;
        const chord = chordProgression[chordIndex % chordProgression.length];

        chord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          // Warm sine with soft harmonic
          osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + noteIdx * 0.28);

          // Soft bell-like envelope with long decay
          const startTime = now + noteIdx * 0.28;
          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 2.5);
        });

        chordIndex++;
        timerRef.current = window.setTimeout(playNextChord, 2200);
      };

      isLoopingRef.current = true;
      playNextChord();
    } catch {
      // AudioContext not allowed or supported
    }
  };

  const stopMusic = () => {
    isLoopingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      playRomanticChords();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Անջատել երաժշտությունը' : 'Միացնել ռոմանտիկ մեղեդին'}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-[#FDFBF7]/90 border-[#D4AF37] text-[#99731C] ring-2 ring-[#D4AF37]/30 shadow-[#D4AF37]/20'
            : 'bg-[#FDFBF7]/85 border-[#E2A992]/40 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#D4AF37]'
        }`}
        aria-label="Toggle Wedding Music"
      >
        <span className="relative flex h-3 w-3">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              isPlaying ? 'bg-[#D4AF37]' : 'bg-[#E2A992]'
            }`}
          ></span>
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#B38728] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}

        <span className="text-xs font-serif tracking-wider whitespace-nowrap">
          {isPlaying ? 'Մեղեդի' : 'Երաժշտություն'}
        </span>

        {!hasInteracted && !isPlaying && (
          <span className="absolute -top-8 right-0 bg-[#1A1A1A] text-white text-[11px] font-sans px-2.5 py-0.5 rounded-md shadow-md pointer-events-none whitespace-nowrap animate-bounce">
            Միացնել 🎵
          </span>
        )}
      </button>
    </div>
  );
};
