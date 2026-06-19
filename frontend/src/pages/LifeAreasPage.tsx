import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { Briefcase, Heart, Activity, DollarSign, Star, ArrowRight } from 'lucide-react';

interface LifeArea {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  description: string;
  prompt: string;
}

const LIFE_AREAS: LifeArea[] = [
  { id: 'career',       label: 'Career & Purpose',      icon: Briefcase, color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/20', description: 'Your 10th house and Midheaven reveal your public role and highest calling.', prompt: 'What does my chart say about my career and life purpose?' },
  { id: 'love',         label: 'Love & Relationships',   icon: Heart,     color: 'text-pink-300',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   description: 'Venus placement and 7th house rule how you love and are loved.', prompt: 'How does my chart influence my love life and relationships?' },
  { id: 'health',       label: 'Health & Vitality',      icon: Activity,  color: 'text-emerald-300',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',description: 'The 6th house and Mars show your body\'s energy and health patterns.', prompt: 'What does my birth chart reveal about my health and vitality?' },
  { id: 'finances',     label: 'Money & Resources',      icon: DollarSign,color: 'text-gold-400',   bg: 'bg-gold-500/10',   border: 'border-gold-500/20',   description: 'The 2nd house and Venus placement shape your relationship with wealth.', prompt: 'What does my chart say about my financial patterns and abundance?' },
  { id: 'spiritual',    label: 'Spiritual Growth',       icon: Star,      color: 'text-sky-300',    bg: 'bg-sky-500/10',    border: 'border-sky-500/20',    description: 'Your 12th house, Neptune and the North Node point toward soul evolution.', prompt: 'What does my birth chart reveal about my spiritual path and soul purpose?' },
];

export default function LifeAreasPage() {
  const { setActivePage, computedChart, setPendingMessage } = useAppStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleAsk = (prompt: string) => {
    setPendingMessage(prompt);
    setActivePage('chat');
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">Life Areas</h1>
        <p className="text-sm font-body text-slate-500 mt-1">Explore how your chart influences every dimension of life</p>
      </div>

      {!computedChart && (
        <motion.div variants={cardVariants} className="glass-gold p-5 text-center rounded-2xl">
          <p className="text-sm font-body text-slate-400 mb-3">Compute your birth chart first to get personalized life area insights.</p>
          <button onClick={() => setActivePage('chat')} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
            Ask Aradhana to Cast My Chart
          </button>
        </motion.div>
      )}

      <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-3">
        {LIFE_AREAS.map((area) => {
          const Icon = area.icon;
          const isOpen = expanded === area.id;
          return (
            <motion.div key={area.id} variants={cardVariants}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${area.border} ${area.bg}`}>
              <button
                onClick={() => {
                  if (isOpen) {
                    setExpanded(null);
                  } else {
                    setExpanded(area.id);
                    handleAsk(area.prompt);
                  }
                }}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className={`w-10 h-10 rounded-xl ${area.bg} border ${area.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={area.color} />
                </div>
                <div className="flex-1">
                  <div className={`text-base font-body font-semibold ${area.color}`}>{area.label}</div>
                  <div className="text-xs font-body text-slate-500 mt-0.5">{area.description}</div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowRight size={16} className="text-slate-600" />
                </motion.div>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-5 pb-5"
                >
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-sm font-body text-slate-400 mb-4 italic">
                      {getAreaInsight(area.id)}
                    </p>
                    <button
                      onClick={() => handleAsk(area.prompt)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body border transition-all ${area.border} ${area.bg} ${area.color} hover:opacity-80`}
                    >
                      Ask Aradhana about {area.label} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function getAreaInsight(id: string): string {
  const insights: Record<string, string> = {
    career:   'Your Midheaven sign and its ruler reveal your public calling. Saturn transits to the 10th house often mark career pivots and professional maturation.',
    love:     'Venus rules your love language — its sign shows what you value in partners. The 7th house cusp describes the qualities you seek in committed relationships.',
    health:   'Mars shows your physical vitality and energy style. Challenging 6th house transits can indicate periods of burnout that ask for rest and recovery.',
    finances: 'Jupiter in the 2nd or 8th house often brings financial expansion. Your relationship with security is shaped by early life patterns reflected in the 2nd house.',
    spiritual:'The North Node points toward your soul\'s growth edge this lifetime. 12th house placements reveal hidden strengths and the gifts that emerge through solitude.',
  };
  return insights[id] || '';
}
