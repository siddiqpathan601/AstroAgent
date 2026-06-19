import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { Plus, BookOpen, Trash2, Sparkles } from 'lucide-react';
import { formatDate, formatRelativeTime } from '../lib/formatters';
import type { JournalEntry } from '../types/user';

const PROMPTS = [
  'What patterns do you keep noticing in your life right now?',
  'What does your heart truly long for in this season?',
  'Describe a dream you had recently. What symbols stood out?',
  'Where are you resisting growth? What would surrender look like?',
  'What are you most grateful for today, no matter how small?',
  'What does today\'s cosmic energy feel like in your body?',
  'If the moon could whisper advice to you, what would she say?',
];

export default function JournalPage() {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useAppStore();
  const [writing, setWriting] = useState(false);
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [viewEntry, setViewEntry] = useState<JournalEntry | null>(null);

  const todayPrompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  const handleNew = () => {
    setContent('');
    setSelectedPrompt(todayPrompt);
    setWriting(true);
    setViewEntry(null);
  };

  const handleSave = () => {
    if (!content.trim()) return;
    addJournalEntry({
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
      content: content.trim(),
      prompt: selectedPrompt,
    });
    setWriting(false);
    setContent('');
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-100">Cosmic Journal</h1>
          <p className="text-sm font-body text-slate-500 mt-1">Reflect, release, and grow through writing</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
          <Plus size={16} /> New Entry
        </motion.button>
      </div>

      {/* Write area */}
      <AnimatePresence>
        {writing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="glass-gold p-5 rounded-2xl space-y-4">
            {/* Prompt */}
            {selectedPrompt && (
              <div className="flex items-start gap-2">
                <Sparkles size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-body text-gold-400/80 italic">{selectedPrompt}</p>
              </div>
            )}
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Begin writing..."
              autoFocus
              rows={8}
              className="w-full bg-cosmic-800/40 border border-violet-500/15 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 font-body resize-none outline-none input-glow leading-relaxed"
            />
            <div className="flex justify-between items-center">
              <div className="text-xs font-body text-slate-600">{content.length} characters</div>
              <div className="flex gap-2">
                <button onClick={() => setWriting(false)} className="px-4 py-2 text-sm font-body text-slate-500 hover:text-slate-300 transition-colors">Cancel</button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} disabled={!content.trim()}
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-white rounded-xl text-sm font-body transition-all">
                  Save Entry
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entry list */}
      {journalEntries.length === 0 && !writing ? (
        <motion.div variants={cardVariants} className="glass-card p-10 text-center">
          <div className="text-4xl mb-3">✎</div>
          <h3 className="font-display text-xl text-slate-200 mb-2">Your Journal Awaits</h3>
          <p className="text-sm font-body text-slate-500 mb-4">Write your first entry to begin your cosmic reflection practice.</p>
          <p className="text-sm font-body text-gold-400/60 italic">Today's prompt: "{todayPrompt}"</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {journalEntries.map((entry) => (
            <motion.div key={entry.id} variants={cardVariants}
              className="glass-card p-5 card-hover cursor-pointer"
              onClick={() => setViewEntry(viewEntry?.id === entry.id ? null : entry)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {entry.prompt && (
                    <div className="text-[11px] font-body text-violet-400/60 mb-1.5 italic truncate">📍 {entry.prompt}</div>
                  )}
                  <p className={`text-sm font-body text-slate-300 leading-relaxed ${viewEntry?.id !== entry.id ? 'line-clamp-2' : ''}`}>
                    {entry.content}
                  </p>
                  <div className="text-[11px] font-body text-slate-600 mt-2">{formatRelativeTime(entry.date)}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteJournalEntry(entry.id); }}
                  className="text-slate-700 hover:text-rose-400 transition-colors flex-shrink-0 p-1">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
