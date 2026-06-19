import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MessageCircle, Compass, Moon, BookOpen, Calendar, Sparkles } from 'lucide-react';
import { overlayVariants, commandPaletteVariants } from '../../lib/animations';
import { useAppStore } from '../../store/appStore';
import type { AppPage } from '../../types/user';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const { commandPaletteOpen, closeCommandPalette, setActivePage } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  const navTo = (page: AppPage) => { setActivePage(page); closeCommandPalette(); };

  const allItems: CommandItem[] = [
    { id: 'today',    label: 'Today\'s Cosmic Brief', description: 'View your daily cosmic overview', icon: Star,          action: () => navTo('today') },
    { id: 'chat',     label: 'Ask Aradhana',          description: 'Open AI astrology chat',          icon: MessageCircle, action: () => navTo('chat'),    shortcut: 'A' },
    { id: 'chart',    label: 'My Birth Chart',         description: 'View your natal chart',           icon: Compass,       action: () => navTo('chart') },
    { id: 'transits', label: 'Daily Transits',         description: 'Check today\'s planetary aspects', icon: Calendar,      action: () => navTo('transits') },
    { id: 'moon',     label: 'Moon Phase',             description: 'Current lunar phase and cycle',   icon: Moon,          action: () => navTo('moon') },
    { id: 'journal',  label: 'Open Journal',           description: 'Write a reflection or log a dream', icon: BookOpen,    action: () => navTo('journal') },
    { id: 'life',     label: 'Life Areas',             description: 'Career, relationships, health insights', icon: Sparkles, action: () => navTo('life-areas') },
  ];

  const filtered = query.trim()
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cmd-overlay"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="cmd-overlay flex items-start justify-center pt-[15vh]"
        onClick={closeCommandPalette}
      >
        <motion.div
          key="cmd-panel"
          variants={commandPaletteVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full max-w-lg mx-4 glass-elevated rounded-2xl border border-violet-500/20 shadow-glow-violet overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-violet-500/10">
            <Search size={16} className="text-slate-500 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search features, pages, actions..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-600 font-body"
              id="command-palette-input"
            />
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-slate-500 font-code">ESC</kbd>
          </div>

          {/* Results */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500 font-body">No results for "{query}"</div>
            ) : filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-500/08 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <Icon size={15} className="text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-body text-slate-200 group-hover:text-white transition-colors">{item.label}</div>
                    {item.description && (
                      <div className="text-[11px] font-body text-slate-500 truncate">{item.description}</div>
                    )}
                  </div>
                  {item.shortcut && (
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-slate-500 font-code">{item.shortcut}</kbd>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="px-4 py-2.5 border-t border-violet-500/08 flex items-center gap-4 text-[10px] text-slate-600 font-code">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>ESC close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
