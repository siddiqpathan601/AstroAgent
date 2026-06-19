import React from 'react';
import { motion } from 'framer-motion';
import { chipContainerVariants, chipVariants } from '../../lib/animations';

interface FollowUpChipsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function FollowUpChips({ suggestions, onSelect }: FollowUpChipsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <motion.div
      variants={chipContainerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2 mt-3"
    >
      {suggestions.map((s, i) => (
        <motion.button
          key={i}
          variants={chipVariants}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(s)}
          className="px-3 py-1.5 rounded-full glass border border-violet-500/15 hover:border-violet-500/35 text-xs font-body text-slate-400 hover:text-violet-300 transition-all duration-200 text-left"
        >
          {s}
        </motion.button>
      ))}
    </motion.div>
  );
}
