import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Copy, Bookmark, Check } from 'lucide-react';
import AgentTimeline from './AgentTimeline';
import FollowUpChips from './FollowUpChips';
import { messageVariants } from '../../lib/animations';
import { formatTime } from '../../lib/formatters';
import { useAppStore } from '../../store/appStore';
import type { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  onFollowUp: (text: string) => void;
}

export default function MessageBubble({ message, onFollowUp }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const { saveReading } = useAppStore();
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    saveReading({
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      title: message.content.slice(0, 60) + (message.content.length > 60 ? '…' : ''),
      content: message.content,
      timestamp: message.timestamp,
    });
  };

  if (isUser) {
    return (
      <motion.div variants={messageVariants} className="flex justify-end w-full">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-700 to-violet-600 border border-violet-500/30 text-white px-4 py-3 text-sm font-body shadow-md">
          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
          <div className="text-[10px] mt-1.5 text-violet-300/70 text-right font-code">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </motion.div>
    );
  }

  // Agent message
  return (
    <motion.div variants={messageVariants} className="flex justify-start items-start w-full">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-cosmic-800 border border-gold-500/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 shadow-sm">
        <Moon size={14} className="text-gold-400/80" />
      </div>

      <div className="flex-1 max-w-[82%]">
        {/* Bubble */}
        <div className="rounded-2xl rounded-tl-sm glass border border-violet-500/10 text-slate-200 px-4 py-3.5 text-sm font-body shadow-card">
          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
          <div className="text-[10px] mt-2 text-slate-600 font-code">{formatTime(message.timestamp)}</div>
        </div>

        {/* Tool timeline */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <AgentTimeline toolCalls={message.toolCalls} />
        )}

        {/* Action row: copy + save */}
        <div className="flex items-center gap-1 mt-1.5">
          <button onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-body text-slate-600 hover:text-slate-400 hover:bg-white/4 transition-all">
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={handleSave}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-body text-slate-600 hover:text-gold-400 hover:bg-gold-500/5 transition-all">
            <Bookmark size={11} /> Save
          </button>
        </div>

        {/* Follow-up chips */}
        {message.followUps && message.followUps.length > 0 && (
          <FollowUpChips suggestions={message.followUps} onSelect={onFollowUp} />
        )}
      </div>
    </motion.div>
  );
}
