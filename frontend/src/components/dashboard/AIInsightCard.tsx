import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';
import { cardVariants } from '../../lib/animations';
import { useAppStore } from '../../store/appStore';
import type { TransitAspect } from '../../types/chart';
import { ASPECT_INFO } from '../../lib/constants';

interface AIInsightCardProps {
  aspects: TransitAspect[];
  onAskMore?: () => void;
  onJournal?: () => void;
}

function generateInsight(aspects: TransitAspect[]): string {
  if (!aspects.length) {
    return "The cosmos holds steady energy today. A good time for reflection, routine, and consolidating recent gains. Trust the pace of the universe.";
  }

  // Find the most significant aspect (lowest orb, highest-weight planet)
  const top = aspects.slice().sort((a, b) => a.orb - b.orb)[0];
  const aspectLabel = ASPECT_INFO[top.aspect.toLowerCase()]?.label || top.aspect;
  const energy = ASPECT_INFO[top.aspect.toLowerCase()]?.energy || '';

  const sentenceMap: Record<string, string> = {
    trine:       `${top.transit_planet} forms a flowing trine to your natal ${top.natal_planet} — creativity, ease, and natural momentum are amplified. Lean into it.`,
    sextile:     `A supportive sextile from ${top.transit_planet} to your natal ${top.natal_planet} opens doors. Seize the opportunity with intention.`,
    conjunction: `${top.transit_planet} meets your natal ${top.natal_planet} in conjunction — this amplifies its themes powerfully. Direct this energy consciously.`,
    square:      `${top.transit_planet} squares your natal ${top.natal_planet}, creating productive tension. Challenges are the universe's way of sparking growth.`,
    opposition:  `${top.transit_planet} opposes your natal ${top.natal_planet} — a balancing moment. Notice the push-pull between opposing needs and find the middle path.`,
    quincunx:    `An adjusting quincunx asks you to adapt. ${top.transit_planet} nudges your natal ${top.natal_planet} — small pivots lead to larger harmony.`,
  };

  return sentenceMap[top.aspect.toLowerCase()] ||
    `${top.transit_planet} ${aspectLabel} your natal ${top.natal_planet} — ${energy.toLowerCase()} energy is in the air today.`;
}

function getTodayPrompt(aspects: TransitAspect[]): string {
  const prompts = [
    "What bold step have you been postponing?",
    "What does your heart truly want right now?",
    "Where are you playing it too safe?",
    "What can you let go of to create space for growth?",
    "What relationship in your life needs honest attention?",
    "What would you do today if you weren't afraid?",
  ];
  const index = (new Date().getDate() + aspects.length) % prompts.length;
  return prompts[index];
}

export default function AIInsightCard({ aspects, onAskMore, onJournal }: AIInsightCardProps) {
  const { setActivePage } = useAppStore();
  const insight = generateInsight(aspects);
  const prompt = getTodayPrompt(aspects);

  return (
    <motion.div variants={cardVariants} className="glass-gold p-5 card-gold-hover">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/20 flex items-center justify-center">
          <Sparkles size={14} className="text-gold-400 animate-cosmic-pulse" />
        </div>
        <div>
          <div className="label text-slate-600">Aradhana's Insight</div>
          <div className="text-[11px] font-body text-gold-400/70 mt-0.5">Today's cosmic guidance</div>
        </div>
      </div>

      {/* Insight text */}
      <p className="font-display text-base font-medium text-slate-100 leading-relaxed mb-4 italic">
        "{insight}"
      </p>

      {/* Reflection prompt */}
      <div className="px-4 py-3 bg-violet-500/08 border border-violet-500/12 rounded-xl mb-4">
        <div className="label text-violet-500 mb-1">Today's Reflection</div>
        <p className="text-sm font-body text-slate-300 italic">"{prompt}"</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={onAskMore || (() => setActivePage('chat'))}
          id="insight-ask-more"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-body hover:bg-violet-500/20 transition-all">
          <Sparkles size={12} /> Ask Aradhana ↗
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={onJournal || (() => setActivePage('journal'))}
          id="insight-journal"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/4 border border-white/8 text-slate-400 text-xs font-body hover:bg-white/8 transition-all">
          <BookOpen size={12} /> Write in Journal
        </motion.button>
      </div>
    </motion.div>
  );
}
