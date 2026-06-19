import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { useMoonPhase } from '../hooks/useMoonPhase';
import MoonPhaseWidget from '../components/dashboard/MoonPhaseWidget';
import { MOON_PHASES } from '../lib/constants';

export default function MoonPhasePage() {
  const moon = useMoonPhase();
  const { setActivePage } = useAppStore();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">Moon Phase Tracker</h1>
        <p className="text-sm font-body text-slate-500 mt-1">Track the lunar cycle and its cosmic influence</p>
      </div>

      {/* Current phase hero */}
      <motion.div variants={cardVariants} className="glass-gold p-6 card-gold-hover">
        <div className="flex items-center gap-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl flex-shrink-0">
            {moon.emoji}
          </motion.div>
          <div className="flex-1">
            <div className="label text-gold-400/60 mb-1">Current Phase</div>
            <h2 className="font-display text-2xl font-semibold text-slate-100 mb-1">{moon.phaseName}</h2>
            <p className="text-sm font-body text-slate-400">Moon in <span className="text-slate-200">{moon.sign}</span> · {moon.illumination}% illuminated</p>
            <p className="text-sm font-body text-slate-500 mt-2 italic">{moon.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="label text-slate-600 mb-1">Full Moon In</div>
            <div className="font-display text-3xl font-semibold text-gold-400">
              {moon.daysToFullMoon <= 0 ? '🌕' : `${moon.daysToFullMoon}d`}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phase cycle */}
      <motion.div variants={cardVariants} className="glass-card p-5">
        <div className="label text-slate-600 mb-4">Lunar Cycle</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOON_PHASES.map((phase, i) => {
            const isActive = i === moon.phaseIndex;
            return (
              <div key={i} className={`p-3 rounded-xl border text-center transition-all ${isActive ? 'glass-gold border-gold-500/25' : 'bg-cosmic-800/20 border-violet-500/08'}`}>
                <div className="text-2xl mb-1">{phase.emoji}</div>
                <div className={`text-xs font-body font-semibold mb-0.5 ${isActive ? 'text-gold-400' : 'text-slate-400'}`}>{phase.name}</div>
                <div className="text-[10px] font-body text-slate-600">{phase.description}</div>
                {isActive && <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400 mx-auto" />}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Ritual suggestions */}
      <motion.div variants={cardVariants} className="glass-card p-5">
        <div className="label text-slate-600 mb-3">Ritual Suggestions</div>
        <div className="space-y-2">
          {getRituals(moon.phaseIndex).map((ritual, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-cosmic-800/20 rounded-xl">
              <span className="text-violet-400 flex-shrink-0 mt-0.5">✦</span>
              <p className="text-sm font-body text-slate-300">{ritual}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function getRituals(phaseIndex: number): string[] {
  const rituals: Record<number, string[]> = {
    0: ['Set clear intentions in a journal', 'Meditate with a candle to invite new beginnings', 'Plant seeds — metaphorical or literal'],
    1: ['Take one small step toward your goal', 'Visualize your intentions as already real', 'Begin a creative project you\'ve been planning'],
    2: ['Make a key decision you\'ve been postponing', 'Check in on your intentions — adjust if needed', 'Connect with a mentor or guide'],
    3: ['Refine and polish your work', 'Gratitude practice for progress made', 'Clear physical clutter to match inner clarity'],
    4: ['Release what no longer serves you', 'Celebrate your progress openly', 'Moonbathe or spend time in nature under moonlight'],
    5: ['Share your gifts and insights with others', 'Express gratitude in writing', 'Rest and reflect on the cycle\'s lessons'],
    6: ['Write down what you want to release', 'Forgiveness journaling', 'Declutter and simplify your environment'],
    7: ['Deep rest and stillness', 'Dream journaling', 'Prepare for the next new moon cycle'],
  };
  return rituals[phaseIndex] || rituals[0];
}
