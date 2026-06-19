import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, AlertTriangle, Clock, Zap } from 'lucide-react';
import type { ToolCallEvent } from '../../types/chat';
import { chipVariants } from '../../lib/animations';

interface AgentTimelineProps {
  toolCalls: ToolCallEvent[];
  isStreaming?: boolean;
}

const TOOL_LABELS: Record<string, { label: string; icon: string }> = {
  compute_birth_chart: { label: 'Computing natal chart',   icon: '◉' },
  get_daily_transits:  { label: 'Fetching transit data',   icon: '⬡' },
  knowledge_lookup:    { label: 'Searching astro knowledge', icon: '◈' },
  geocode_place:       { label: 'Geocoding location',       icon: '📍' },
};

export default function AgentTimeline({ toolCalls, isStreaming = false }: AgentTimelineProps) {
  const [expanded, setExpanded] = useState(false);

  if (toolCalls.length === 0 && !isStreaming) return null;

  return (
    <div className="mt-2 mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[11px] text-violet-400/70 hover:text-violet-300 font-body transition-colors"
      >
        <Zap size={11} className="text-violet-400" />
        <span>
          {isStreaming && toolCalls.length === 0
            ? 'Consulting celestial positions...'
            : `${toolCalls.length} tool${toolCalls.length !== 1 ? 's' : ''} executed`}
        </span>
        {toolCalls.length > 0 && (
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={11} />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {expanded && toolCalls.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-violet-500/20">
              {toolCalls.map((tc, i) => {
                const meta = TOOL_LABELS[tc.name] || { label: tc.name, icon: '⚙' };
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5 py-2 px-3 bg-cosmic-800/40 rounded-lg"
                  >
                    {/* Status dot */}
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${tc.error ? 'bg-rose-500/20' : 'bg-emerald-500/15'}`}>
                      {tc.error
                        ? <AlertTriangle size={10} className="text-rose-400" />
                        : <Check size={10} className="text-emerald-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-body font-medium text-slate-300">{meta.icon} {meta.label}</span>
                        <div className="flex items-center gap-1 text-[10px] font-code text-slate-600">
                          <Clock size={9} />
                          {Math.round(tc.ms)}ms
                        </div>
                      </div>
                      {(tc.error || tc.output_summary) && (
                        <div className={`text-[11px] font-body mt-0.5 ${tc.error ? 'text-rose-400' : 'text-slate-500'}`}>
                          {tc.error || tc.output_summary}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
