import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, StopCircle, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  prefillValue?: string; // typewriter text from parent
}

const PLACEHOLDER_PROMPTS = [
  'Ask about your natal chart placements...',
  'What does Mercury retrograde mean for me?',
  'What\'s the energy like today?',
  'Interpret my Venus in Scorpio...',
  'What are my dominant planets?',
];

export default function ChatInput({ onSend, onCancel, isLoading = false, disabled = false, prefillValue }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_PROMPTS[0]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // When prefillValue is set by parent (typewriter), display it read-only
  const displayValue = prefillValue !== undefined ? prefillValue : value;
  const isTyping = prefillValue !== undefined;

  // Rotate placeholder on mount
  useEffect(() => {
    const idx = Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length);
    setPlaceholder(PLACEHOLDER_PROMPTS[idx]);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, [displayValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled || isTyping) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="flex items-end gap-2 p-1.5 bg-cosmic-800/60 border border-violet-500/15 rounded-2xl input-glow transition-all duration-300">
      {/* Sparkle icon */}
      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl mb-0.5">
        <Sparkles size={16} className={`transition-colors ${value ? 'text-violet-400' : 'text-slate-700'}`} />
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        id="chat-input"
        value={displayValue}
        onChange={(e) => { if (!isTyping) setValue(e.target.value); }}
        onKeyDown={handleKeyDown}
        placeholder={isTyping ? '' : placeholder}
        disabled={disabled || isTyping}
        rows={1}
        className={`flex-1 bg-transparent border-none outline-none resize-none text-sm placeholder-slate-700 font-body py-2.5 min-h-[40px] max-h-[120px] leading-relaxed transition-colors ${
          isTyping ? 'text-violet-300' : 'text-slate-200'
        }`}
        aria-label="Message Aradhana"
      />

      {/* Action button */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.button key="stop" type="button" onClick={onCancel}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-rose-400 hover:bg-rose-500/25 transition-all mb-0.5"
            aria-label="Stop generating">
            <StopCircle size={16} />
          </motion.button>
        ) : (
          <motion.button key="send" type="submit" disabled={!value.trim() || disabled}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            whileTap={{ scale: 0.93 }}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all mb-0.5 disabled:opacity-20 disabled:cursor-not-allowed bg-violet-600 hover:bg-violet-500 text-white shadow-glow-sm"
            aria-label="Send message">
            <Send size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}
