import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye } from 'lucide-react';
import { ScratchCardItem } from '../types';

interface ScratchCardProps {
  card: ScratchCardItem;
  index: number;
  photoUrl: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ card, index, photoUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas surface with luxury gold foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Luxury Rose Gold / Gold Brushed Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4AF37');
    grad.addColorStop(0.3, '#F7E7CE');
    grad.addColorStop(0.6, '#E2A992');
    grad.addColorStop(0.9, '#C57B66');
    grad.addColorStop(1, '#B38728');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add subtle brushed noise or sparkle stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer decorative border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner hairline border
    ctx.strokeStyle = 'rgba(153, 115, 28, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Text & Icon instructions on scratch surface
    ctx.fillStyle = '#1A1A1A';
    ctx.font = '600 13px "Noto Serif Armenian", "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ՔԵՐԵՔ ԱՅՍՏԵՂ 🪙', width / 2, height / 2 - 10);

    ctx.font = '400 11px "Montserrat", sans-serif';
    ctx.fillStyle = 'rgba(26, 26, 26, 0.75)';
    ctx.fillText(card.title, width / 2, height / 2 + 14);
  }, [card.title]);

  useEffect(() => {
    if (!isRevealed) {
      initCanvas();
    }
  }, [initCanvas, isRevealed]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Check how much of the canvas is scratched
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const sampleWidth = Math.floor(canvas.width / 4);
      const sampleHeight = Math.floor(canvas.height / 4);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      // Sample every 4th pixel for performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / (totalPixels / 4)) * 100));
      setScratchPercent(percent);

      if (percent > 45) {
        revealCard();
      }
    } catch {
      // ignore context security if any
    }
  }, [isRevealed]);

  const revealCard = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchPercent(100);

    // Fire celebration confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E2A992', '#FDFBF7'],
    });
  };

  // Scratch drawing logic
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = { x, y };

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPointRef.current = { x, y };
    scratch(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratch(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scratch Box Card */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-md border border-[#D4AF37]/35 select-none"
      >
        {/* UNDERNEATH: Revealed Photo */}
        <div className="absolute inset-0 bg-[#1C1B18] overflow-hidden flex items-center justify-center">
          <img
            src={photoUrl}
            alt={card.title}
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          {/* Subtle bottom gradient overlay for badge and title */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 sm:p-4 text-left pointer-events-none flex items-end justify-between">
            <div>
              <span className="inline-block text-[10px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs mb-1 border border-white/20">
                {card.badge || `Loto #${index + 1}`}
              </span>
              <h4 className="font-serif text-xs sm:text-sm font-medium text-white drop-shadow-sm line-clamp-1">
                {card.title}
              </h4>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-serif text-[#E6C280] drop-shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Բացված</span>
            </div>
          </div>
        </div>

        {/* OVERLAY: HTML5 Canvas for scratching */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="absolute inset-0 z-20 cursor-crosshair touch-none transition-opacity duration-300"
          />
        )}
      </div>

      {/* Under-Card Helper & Reveal Button */}
      <div className="mt-3 flex items-center justify-between w-full px-1 text-xs">
        <span className="font-serif text-[11px] text-[#1A1A1A]/60">
          Քարտ #{index + 1}
        </span>

        {!isRevealed ? (
          <button
            onClick={revealCard}
            className="inline-flex items-center gap-1 text-[11px] font-serif text-[#99731C] hover:text-[#1A1A1A] transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Բացել անմիջապես</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-serif text-emerald-700 font-medium">
            ✓ Բացված
          </span>
        )}
      </div>
    </div>
  );
};
