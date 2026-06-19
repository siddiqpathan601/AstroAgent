import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { Bookmark, Trash2, Copy } from 'lucide-react';
import { formatRelativeTime, truncate } from '../lib/formatters';

export default function SavedReadingsPage() {
  const { savedReadings, deleteReading } = useAppStore();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">Saved Readings</h1>
        <p className="text-sm font-body text-slate-500 mt-1">{savedReadings.length} reading{savedReadings.length !== 1 ? 's' : ''} saved</p>
      </div>

      {savedReadings.length === 0 ? (
        <motion.div variants={cardVariants} className="glass-card p-10 text-center">
          <div className="text-4xl mb-3">🔖</div>
          <h3 className="font-display text-xl text-slate-200 mb-2">No Saved Readings Yet</h3>
          <p className="text-sm font-body text-slate-500">Click the bookmark icon under any AI response to save it here.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {savedReadings.map((reading) => (
            <motion.div key={reading.id} variants={cardVariants} className="glass-card p-5 card-hover">
              <div className="flex items-start gap-3">
                <Bookmark size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-slate-300 leading-relaxed">{reading.content}</p>
                  <div className="text-[11px] font-body text-slate-600 mt-2">{formatRelativeTime(reading.timestamp)}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => navigator.clipboard.writeText(reading.content)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/4 transition-all" aria-label="Copy">
                    <Copy size={13} />
                  </button>
                  <button onClick={() => deleteReading(reading.id)}
                    className="p-1.5 rounded-lg text-slate-700 hover:text-rose-400 hover:bg-rose-500/8 transition-all" aria-label="Delete">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
