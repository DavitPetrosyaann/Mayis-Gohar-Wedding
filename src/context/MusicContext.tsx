import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  playMusic: () => void;
  stopMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const playRomanticChords = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic Armenian/Warm harmonic chord progression in Hz (Cmaj9, Am9, Fmaj7, Gsus4)
      const chordProgression: number[][] = [
        [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
        [220.0, 261.63, 329.63, 392.0, 523.25], // Am9
        [174.61, 220.0, 261.63, 329.63, 440.0], // Fmaj7
        [196.0, 246.94, 293.66, 392.0, 493.88], // Gsus4
      ];

      let chordIndex = 0;

      const playNextChord = () => {
        if (!isLoopingRef.current || !audioCtxRef.current) return;
        const now = ctx.currentTime;
        const chord = chordProgression[chordIndex % chordProgression.length];

        chord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + noteIdx * 0.28);

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
      setIsPlaying(true);
    } catch {
      // AudioContext not supported
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
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      playRomanticChords();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        playMusic: playRomanticChords,
        stopMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
