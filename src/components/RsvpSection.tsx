import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, User, Heart, MessageSquare, AlertCircle, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RSVPFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const RsvpSection: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const [formData, setFormData] = useState<RSVPFormData>(() => {
    try {
      const saved = localStorage.getItem('mayis_gohar_rsvp');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      guestName: '',
      attendance: 'attending',
      guestsCount: 2,
      phone: '',
      dietaryOrNote: '',
      musicWish: '',
    };
  });

  const [guestsCountInput, setGuestsCountInput] = useState<string>(
    formData.guestsCount ? String(formData.guestsCount) : '2'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(() => {
    try {
      return !!localStorage.getItem('mayis_gohar_rsvp');
    } catch {
      return false;
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.guestName.trim()) {
      errs.guestName = t.rsvp.nameRequired;
    }

    // Only validate guest count if attending
    if (formData.attendance === 'attending') {
      const count = parseInt(guestsCountInput, 10);
      if (isNaN(count) || count < 1) {
        errs.guestsCount = t.rsvp.countRequired;
      } else if (count > 10) {
        errs.guestsCount = t.rsvp.maxCountError;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Only allow positive digits up to 2 characters
    if (val === '' || /^[0-9\b]+$/.test(val)) {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num > 10) {
        setGuestsCountInput('10');
        setFormData({ ...formData, guestsCount: 10 });
        setErrors({ ...errors, guestsCount: t.rsvp.maxCountError });
      } else {
        setGuestsCountInput(val);
        setFormData({ ...formData, guestsCount: isNaN(num) ? 1 : num });
        if (errors.guestsCount) setErrors({ ...errors, guestsCount: '' });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.setItem(
          'mayis_gohar_rsvp',
          JSON.stringify({
            ...formData,
            guestsCount:
              formData.attendance === 'attending'
                ? Math.min(10, Math.max(1, parseInt(guestsCountInput, 10) || 1))
                : 0,
          })
        );
      } catch {
        // ignore
      }

      if (formData.attendance === 'attending') {
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C0C7D1', '#A87B5B', '#FAF8F5', '#8A929A'],
        });
      }
    }, 600);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF8F5] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#A87B5B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8A929A]/30 bg-[#FAF8F5] shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A87B5B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A5F42] font-serif font-semibold">
              {t.rsvp.badge}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#A87B5B]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1B18] tracking-wide">
            {t.rsvp.title}
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#1C1B18]/75 mt-2">
            {t.rsvp.subtitle}
          </p>
        </div>

        {/* Card Form Wrapper */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 shadow-lg border border-[#8A929A]/30 relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* 1. Attendance Radio Toggle */}
                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-[#8A5F42] mb-2 font-semibold">
                    {t.rsvp.attendanceLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Attending Yes */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'border-[#8A5F42] bg-[#8A5F42]/8 ring-2 ring-[#8A5F42]/40 shadow-xs'
                          : 'border-[#8A929A]/35 hover:border-[#8A5F42]/50'
                      }`}
                    >
                      <div>
                        <span className="font-serif text-base text-[#1C1B18] font-semibold block">
                          {t.rsvp.attendingYes}
                        </span>
                        <span className="text-xs font-serif text-[#8A5F42]">
                          {t.rsvp.attendingYesSub}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          formData.attendance === 'attending'
                            ? 'border-[#8A5F42] bg-[#8A5F42] text-white'
                            : 'border-[#8A929A]'
                        }`}
                      >
                        {formData.attendance === 'attending' && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {/* Attending No («Ցավոք չեմ կարող») */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'not_attending' })}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        formData.attendance === 'not_attending'
                          ? 'border-[#A87B5B] bg-[#A87B5B]/10 ring-2 ring-[#A87B5B]/40 shadow-xs'
                          : 'border-[#8A929A]/35 hover:border-[#8A5F42]/50'
                      }`}
                    >
                      <div>
                        <span className="font-serif text-base text-[#1C1B18] font-semibold block">
                          {t.rsvp.attendingNo}
                        </span>
                        <span className="text-xs font-serif text-[#1C1B18]/65">
                          {t.rsvp.attendingNoSub}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          formData.attendance === 'not_attending'
                            ? 'border-[#A87B5B] bg-[#A87B5B] text-white'
                            : 'border-[#8A929A]'
                        }`}
                      >
                        {formData.attendance === 'not_attending' && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Guest Name (Always Visible) */}
                <div>
                  <label
                    htmlFor="guestName"
                    className="block text-xs font-serif uppercase tracking-widest text-[#8A5F42] mb-1.5 font-semibold"
                  >
                    {t.rsvp.guestNameLabel}
                  </label>
                  <div className="relative">
                    <User
                      className={`w-4 h-4 text-[#8A5F42] absolute ${
                        isRtl ? 'right-3.5' : 'left-3.5'
                      } top-1/2 -translate-y-1/2 pointer-events-none`}
                    />
                    <input
                      id="guestName"
                      type="text"
                      placeholder={t.rsvp.guestNamePlaceholder}
                      value={formData.guestName}
                      onChange={(e) => {
                        setFormData({ ...formData, guestName: e.target.value });
                        if (errors.guestName) setErrors({ ...errors, guestName: '' });
                      }}
                      className={`w-full ${
                        isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      } py-3 rounded-xl bg-[#FAF8F5] border text-sm font-serif text-[#1C1B18] placeholder:text-[#1C1B18]/40 focus:outline-hidden focus:ring-2 focus:ring-[#8A5F42]/50 transition-all ${
                        errors.guestName
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-[#8A929A]/40 focus:border-[#8A5F42]'
                      }`}
                    />
                  </div>
                  {errors.guestName && (
                    <p className="mt-1 text-xs text-red-600 font-serif flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.guestName}</span>
                    </p>
                  )}
                </div>

                {/* REQUIREMENT 4: When switching to «Ցավոք չեմ կարող», HIDE guest count, favorite song, etc. */}
                {formData.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    {/* REQUIREMENT 2: Allow user to type the number of guests directly, max 10 */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="guestsCount"
                          className="block text-xs font-serif uppercase tracking-widest text-[#8A5F42] font-semibold"
                        >
                          {t.rsvp.guestCountLabel}
                        </label>
                        <span className="text-[11px] font-serif text-[#8A5F42]/80">
                          {t.rsvp.guestCountHelp}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="guestsCount"
                          type="number"
                          min="1"
                          max="10"
                          value={guestsCountInput}
                          onChange={handleGuestCountChange}
                          placeholder={t.rsvp.guestCountPlaceholder}
                          className={`w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border text-sm font-serif text-[#1C1B18] placeholder:text-[#1C1B18]/40 focus:outline-hidden focus:ring-2 focus:ring-[#8A5F42]/50 transition-all ${
                            errors.guestsCount
                              ? 'border-red-400 bg-red-50/20'
                              : 'border-[#8A929A]/40 focus:border-[#8A5F42]'
                          }`}
                        />
                        <div
                          className={`absolute ${
                            isRtl ? 'left-3' : 'right-3'
                          } top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-[#8A5F42] font-serif`}
                        >
                          <span>/ 10</span>
                        </div>
                      </div>
                      {errors.guestsCount && (
                        <p className="mt-1 text-xs text-red-600 font-serif flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.guestsCount}</span>
                        </p>
                      )}
                    </div>

                    {/* Music Wish / Favorite Song (Only if attending) */}
                    <div>
                      <label
                        htmlFor="musicWish"
                        className="block text-xs font-serif uppercase tracking-widest text-[#8A5F42] mb-1.5 font-semibold"
                      >
                        {t.rsvp.musicLabel}
                      </label>
                      <input
                        id="musicWish"
                        type="text"
                        placeholder={t.rsvp.musicPlaceholder}
                        value={formData.musicWish || ''}
                        onChange={(e) => setFormData({ ...formData, musicWish: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#8A929A]/40 text-sm font-serif text-[#1C1B18] placeholder:text-[#1C1B18]/40 focus:outline-hidden focus:border-[#8A5F42] focus:ring-2 focus:ring-[#8A5F42]/50 transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Warm Wishes or Note (Always available) */}
                <div>
                  <label
                    htmlFor="dietary"
                    className="block text-xs font-serif uppercase tracking-widest text-[#8A5F42] mb-1.5 font-semibold"
                  >
                    {t.rsvp.dietaryLabel}
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className={`w-4 h-4 text-[#8A5F42] absolute ${
                        isRtl ? 'right-3.5' : 'left-3.5'
                      } top-3.5 pointer-events-none`}
                    />
                    <textarea
                      id="dietary"
                      rows={3}
                      placeholder={t.rsvp.dietaryPlaceholder}
                      value={formData.dietaryOrNote}
                      onChange={(e) => setFormData({ ...formData, dietaryOrNote: e.target.value })}
                      className={`w-full ${
                        isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      } py-3 rounded-xl bg-[#FAF8F5] border border-[#8A929A]/40 text-sm font-serif text-[#1C1B18] placeholder:text-[#1C1B18]/40 focus:outline-hidden focus:border-[#8A5F42] focus:ring-2 focus:ring-[#8A5F42]/50 transition-all resize-none`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8A929A] via-[#A87B5B] to-[#8A929A] hover:brightness-105 active:scale-[0.99] text-[#FAF8F5] font-serif text-sm font-medium tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.rsvp.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FAF8F5]" />
                      <span>{t.rsvp.submitBtn}</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success / Confirmed State */
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#8A5F42]/15 text-[#8A5F42] mx-auto flex items-center justify-center shadow-inner">
                  {formData.attendance === 'attending' ? (
                    <Heart className="w-8 h-8 fill-[#8A5F42]" />
                  ) : (
                    <Check className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B18]">
                    {t.rsvp.thankYouTitle}
                  </h3>
                  <p className="font-serif text-sm text-[#1C1B18]/75 leading-relaxed">
                    {formData.attendance === 'attending'
                      ? t.rsvp.thankYouAttending
                      : t.rsvp.thankYouNotAttending}
                  </p>
                </div>

                {formData.attendance === 'attending' && (
                  <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#EDE7DC] border border-[#8A929A]/40 text-xs font-serif text-[#8A5F42] space-y-0.5">
                    <p className="font-semibold">{formData.guestName}</p>
                    <p>
                      {formData.guestsCount}{' '}
                      {formData.guestsCount === 1 ? 'հյուր' : 'հյուր'}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-2 text-xs font-serif text-[#8A5F42] hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{t.rsvp.editRsvp}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
