import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { useMoonPhase } from '../hooks/useMoonPhase';
import { useStreak } from '../hooks/useStreak';
import CosmicScoreCard from '../components/dashboard/CosmicScoreCard';
import MoonPhaseWidget from '../components/dashboard/MoonPhaseWidget';
import AIInsightCard from '../components/dashboard/AIInsightCard';
import { TransitCard } from '../components/dashboard/TransitCard';
import { StreakBadge } from '../components/ui/Badge';
import { getGreeting, formatDate } from '../lib/formatters';

export default function TodayPage() {
  const { birthDetails, computedTransits, setActivePage } = useAppStore();
  const moon = useMoonPhase();
  const { streak } = useStreak();
  const aspects = computedTransits?.aspects || [];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-5xl mx-auto space-y-6">

      {/* Greeting Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-100">
            {getGreeting()}{birthDetails?.name ? `, ${birthDetails.name}` : ''} <span className="text-gold-400">✦</span>
          </h1>
          <p className="text-sm font-body text-slate-500 mt-1">
            {formatDate(new Date().toISOString())} · {moon.emoji} {moon.phaseName}
          </p>
        </div>
        {streak > 0 && <StreakBadge streak={streak} />}
      </div>

      {/* No birth details prompt */}
      {!birthDetails && (
        <motion.div variants={cardVariants}
          className="glass-gold p-6 text-center rounded-2xl card-gold-hover">
          <div className="text-2xl mb-2">✦</div>
          <h3 className="font-display text-lg font-semibold text-slate-100 mb-1">Cast Your Birth Chart</h3>
          <p className="text-sm font-body text-slate-400 mb-4">Enter your birth details to unlock personalized cosmic insights.</p>
          <button onClick={() => setActivePage('settings')}
            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
            Set Up My Chart
          </button>
        </motion.div>
      )}

      {/* Top row: Score + Moon */}
      <motion.div variants={containerVariants} initial="initial" animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CosmicScoreCard aspects={aspects} />
        <MoonPhaseWidget />
      </motion.div>

      {/* AI Insight */}
      <motion.div variants={containerVariants} initial="initial" animate="animate">
        <AIInsightCard aspects={aspects}
          onAskMore={() => setActivePage('chat')}
          onJournal={() => setActivePage('journal')} />
      </motion.div>

      {/* Active Transits */}
      {aspects.length > 0 && (
        <motion.div variants={cardVariants} className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="label text-slate-600 mb-1">Active Aspects</div>
              <h3 className="font-display text-lg font-semibold text-slate-100">Today's Transits</h3>
            </div>
            <button onClick={() => setActivePage('transits')}
              className="text-xs font-body text-violet-400 hover:text-violet-300 transition-colors">
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {aspects.slice(0, 4).map((asp, i) => (
              <TransitCard key={i} aspect={asp} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty transits prompt */}
      {birthDetails && aspects.length === 0 && (
        <motion.div variants={cardVariants} className="glass-card p-6 text-center">
          <div className="text-3xl mb-2">⬡</div>
          <h3 className="font-display text-lg text-slate-200 mb-1">No Transits Loaded Yet</h3>
          <p className="text-sm font-body text-slate-500 mb-4">Ask Aradhana about today's transits to load your personalized aspects.</p>
          <button onClick={() => setActivePage('chat')}
            className="px-5 py-2.5 bg-violet-600/80 hover:bg-violet-600 text-white rounded-xl font-body text-sm transition-all">
            Ask About Today's Energy
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
