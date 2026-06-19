import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { TransitCard, TransitPositionGrid } from '../components/dashboard/TransitCard';

export default function TransitsPage() {
  const { computedTransits, setActivePage } = useAppStore();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-100">Daily Transits</h1>
          <p className="text-sm font-body text-slate-500 mt-1">
            {computedTransits ? `Sky on ${computedTransits.date} · ${computedTransits.aspect_count} active aspects` : 'Current planetary positions and aspects'}
          </p>
        </div>
        <button onClick={() => setActivePage('chat')}
          className="px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-body transition-all">
          Ask Aradhana
        </button>
      </div>

      {!computedTransits ? (
        <motion.div variants={cardVariants} className="glass-card p-10 text-center">
          <div className="text-4xl mb-3">⬡</div>
          <h3 className="font-display text-xl text-slate-200 mb-2">No Transit Data</h3>
          <p className="text-sm font-body text-slate-500 mb-4">Ask Aradhana about today's transits to load your personalized aspects.</p>
          <button onClick={() => setActivePage('chat')} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
            Load Today's Transits
          </button>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-5">
          {/* Active aspects */}
          {computedTransits.aspects.length > 0 && (
            <motion.div variants={cardVariants} className="glass-card p-5">
              <div className="label text-slate-600 mb-4">Active Aspects ({computedTransits.aspects.length})</div>
              <div className="space-y-2">
                {computedTransits.aspects.map((asp, i) => <TransitCard key={i} aspect={asp} />)}
              </div>
            </motion.div>
          )}

          {/* Transit positions */}
          <motion.div variants={cardVariants} className="glass-card p-5">
            <div className="label text-slate-600 mb-4">Planetary Positions Today</div>
            <TransitPositionGrid positions={computedTransits.transit_positions} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
