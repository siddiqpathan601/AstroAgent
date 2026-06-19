import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { Clock, MessageCircle, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '../lib/formatters';

export default function HistoryPage() {
  const { conversationSessions } = useAppStore();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">Conversation History</h1>
        <p className="text-sm font-body text-slate-500 mt-1">{conversationSessions.length} session{conversationSessions.length !== 1 ? 's' : ''} stored</p>
      </div>

      {conversationSessions.length === 0 ? (
        <motion.div variants={cardVariants} className="glass-card p-10 text-center">
          <div className="text-4xl mb-3">🕐</div>
          <h3 className="font-display text-xl text-slate-200 mb-2">No Past Sessions Yet</h3>
          <p className="text-sm font-body text-slate-500">Your conversations with Aradhana will appear here as you chat.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {conversationSessions.map((session) => (
            <motion.div key={session.id} variants={cardVariants} className="glass-card p-5 card-hover">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-body font-semibold text-slate-200">{session.title || 'Untitled Session'}</div>
                  {session.preview && (
                    <p className="text-xs font-body text-slate-500 mt-1 line-clamp-2">{session.preview}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-body text-slate-600">
                    <span>{formatRelativeTime(session.timestamp)}</span>
                    <span>·</span>
                    <span>{session.messageCount} messages</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
