import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Clock, MapPin, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import { pageVariants } from '../../lib/animations';
import { useAppStore } from '../../store/appStore';
import type { BirthDetails } from '../../types/user';

type Step = 'welcome' | 'details' | 'done';

interface FieldErrors { name?: string; date?: string; place?: string; }

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="flex flex-col items-center text-center max-w-sm mx-auto">
      {/* Cosmic orb */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-700 to-violet-900 flex items-center justify-center shadow-glow-violet">
          <span className="text-4xl">☽</span>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center animate-cosmic-pulse">
          <span className="text-xs">✦</span>
        </div>
      </div>

      <h1 className="font-display text-4xl font-semibold text-gradient-cosmic mb-3">Welcome to Celestia</h1>
      <p className="text-slate-400 font-body text-sm leading-relaxed mb-8 max-w-xs">
        Your personal AI astrologer powered by real planetary calculations. Discover your birth chart, daily transits, and personalized cosmic insights.
      </p>

      <div className="space-y-3 w-full mb-8">
        {[
          { emoji: '◉', text: 'Accurate natal chart from your exact birth data' },
          { emoji: '◈', text: 'Daily transit readings personalized to you' },
          { emoji: '✎', text: 'AI-powered cosmic insights and journal prompts' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 glass-card text-left">
            <span className="text-violet-400 flex-shrink-0">{item.emoji}</span>
            <span className="text-sm text-slate-300 font-body">{item.text}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        id="onboarding-begin"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 shadow-glow-sm transition-all"
      >
        <Sparkles size={16} className="text-gold-400" />
        Begin Your Journey
        <ChevronRight size={16} />
      </motion.button>
      <p className="text-[11px] text-slate-600 font-body mt-3">All readings are for reflection and guidance only.</p>
    </motion.div>
  );
}

function BirthDetailsStep({ onSubmit }: { onSubmit: (d: BirthDetails) => void }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [unknownTime, setUnknownTime] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!date) errs.date = 'Birth date is required';
    else if (new Date(date) > new Date()) errs.date = 'Date must be in the past';
    if (!place.trim()) errs.place = 'Birth place is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), date, time: unknownTime ? '12:00' : (time || '12:00'), place: place.trim() });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-body mb-4">
          <span>✦</span> Birth Chart Setup
        </div>
        <h2 className="font-display text-2xl font-semibold text-slate-100">Your Celestial Blueprint</h2>
        <p className="text-slate-500 text-sm font-body mt-1">Enter your birth details to cast your natal chart</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 font-body uppercase tracking-wider mb-2">
            <User size={11} className="text-violet-400" /> Name
          </label>
          <input id="birth-name" type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-cosmic-800/60 border border-violet-500/15 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all font-body input-glow" />
          {errors.name && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-body"><AlertCircle size={12} />{errors.name}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 font-body uppercase tracking-wider mb-2">
            <Calendar size={11} className="text-violet-400" /> Birth Date
          </label>
          <input id="birth-date" type="date" value={date} onChange={e => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full bg-cosmic-800/60 border border-violet-500/15 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all [color-scheme:dark] font-body input-glow" />
          {errors.date && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-body"><AlertCircle size={12} />{errors.date}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 font-body uppercase tracking-wider mb-2">
            <Clock size={11} className="text-violet-400" /> Birth Time
          </label>
          <input id="birth-time" type="time" value={unknownTime ? '' : time}
            onChange={e => setTime(e.target.value)} disabled={unknownTime}
            className="w-full bg-cosmic-800/60 border border-violet-500/15 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none transition-all [color-scheme:dark] disabled:opacity-30 font-body input-glow" />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input type="checkbox" checked={unknownTime} onChange={e => setUnknownTime(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-700 bg-cosmic-800 text-violet-600 focus:ring-violet-500/30" />
            <span className="text-xs text-slate-500 font-body">Time unknown — use 12:00 noon</span>
          </label>
        </div>

        {/* Place */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 font-body uppercase tracking-wider mb-2">
            <MapPin size={11} className="text-violet-400" /> Birth Place
          </label>
          <input id="birth-place" type="text" value={place} onChange={e => setPlace(e.target.value)}
            placeholder="e.g. Mumbai, India"
            className="w-full bg-cosmic-800/60 border border-violet-500/15 focus:border-violet-500/40 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all font-body input-glow" />
          {errors.place && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-body"><AlertCircle size={12} />{errors.place}</p>}
        </div>

        <motion.button whileTap={{ scale: 0.97 }} type="submit" id="submit-birth-details"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-4 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 mt-6 shadow-glow-sm transition-all">
          <Sparkles size={16} className="text-gold-400" /> Cast My Natal Chart
        </motion.button>
      </form>
    </motion.div>
  );
}

function DoneStep({ name, onEnter }: { name: string; onEnter: () => void }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="flex flex-col items-center text-center max-w-sm mx-auto">
      <motion.div className="relative mb-8"
        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-500/20 to-violet-700 border border-gold-500/30 flex items-center justify-center shadow-glow-gold">
          <span className="text-5xl">✦</span>
        </div>
      </motion.div>
      <h2 className="font-display text-3xl font-semibold text-gradient-gold mb-2">Chart Cast, {name}!</h2>
      <p className="text-slate-400 font-body text-sm leading-relaxed mb-8">
        Your celestial blueprint is ready. Aradhana will now give you insights tailored to your unique cosmic signature.
      </p>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onEnter} id="enter-app"
        className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-4 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 shadow-glow-violet transition-all">
        Enter Celestia <ChevronRight size={16} />
      </motion.button>
    </motion.div>
  );
}

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const { setBirthDetails, setOnboardingComplete } = useAppStore();

  const handleDetails = (details: BirthDetails) => {
    setBirthDetails(details);
    setStep('done');
  };

  const handleEnter = () => {
    setOnboardingComplete(true);
  };

  const birthDetails = useAppStore(s => s.birthDetails);

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Cosmic background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-950/30 cosmic-glow-1 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-950/25 cosmic-glow-2 pointer-events-none" />

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10 z-10">
        {(['welcome', 'details', 'done'] as Step[]).map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${step === s ? 'bg-violet-400 scale-125' : step > s || (step === 'done' && i < 2) ? 'bg-violet-600' : 'bg-slate-700'}`} />
            {i < 2 && <div className="w-8 h-px bg-slate-800" />}
          </React.Fragment>
        ))}
      </div>

      <div className="z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 'welcome' && <WelcomeStep key="welcome" onNext={() => setStep('details')} />}
          {step === 'details' && <BirthDetailsStep key="details" onSubmit={handleDetails} />}
          {step === 'done' && <DoneStep key="done" name={birthDetails?.name || 'Seeker'} onEnter={handleEnter} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
