import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Moon, Loader2 } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAppStore } from '../../store/appStore';
import MessageBubble from './MessageBubble';
import AgentTimeline from './AgentTimeline';
import ChatInput from './ChatInput';
import { containerVariants } from '../../lib/animations';

export default function ChatInterface() {
  const { birthDetails, pendingMessage, setPendingMessage } = useAppStore();
  const {
    messages, isLoading, streamingContent, streamingToolCalls,
    error, messagesEndRef, sendMessage, cancelStream, resetChat,
  } = useChat(birthDetails);

  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Auto-type + auto-send pending message from Life Areas / other pages ─────
  useEffect(() => {
    if (!pendingMessage) return;

    const target = pendingMessage;
    setPendingMessage(null); // consume immediately so it doesn't re-fire

    setIsTyping(true);
    setTypingText('');
    let i = 0;

    const typeNext = () => {
      if (i < target.length) {
        setTypingText(target.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(typeNext, 28); // ~35 chars/sec
      } else {
        // Typing done — send after a brief pause
        setIsTyping(false);
        typingRef.current = setTimeout(() => {
          setTypingText('');
          sendMessage(target);
        }, 350);
      }
    };

    typingRef.current = setTimeout(typeNext, 400); // initial delay

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [pendingMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFollowUp = (text: string) => {
    sendMessage(text);
  };

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-violet-500/08 bg-cosmic-900/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-cosmic-800 border border-gold-500/20 flex items-center justify-center shadow-sm">
              <Moon size={16} className="text-gold-400/80" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-cosmic-900" />
          </div>
          <div>
            <div className="text-sm font-body font-semibold text-slate-200">Aradhana</div>
            <div className="text-[10px] font-body text-gold-400/60 uppercase tracking-wider">AI Astrology Companion</div>
          </div>
        </div>
        <button onClick={resetChat} id="clear-conversation"
          className="p-2 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/8 transition-all"
          title="Reset conversation" aria-label="Reset conversation">
          <Trash2 size={15} />
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 min-h-0">
        <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-5">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onFollowUp={handleFollowUp} />
          ))}
        </motion.div>

        {/* Streaming indicator */}
        <AnimatePresence>
          {(isLoading || streamingContent) && (
            <motion.div key="streaming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-2">

              {/* Tool execution timeline */}
              {streamingToolCalls.length > 0 && (
                <div className="flex justify-start items-start w-full pl-11">
                  <AgentTimeline toolCalls={streamingToolCalls} isStreaming />
                </div>
              )}

              {/* Streaming bubble */}
              <div className="flex justify-start items-start w-full">
                <div className="w-8 h-8 rounded-full bg-cosmic-800 border border-gold-500/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <Loader2 size={14} className="text-violet-400 animate-spin" />
                </div>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm glass border border-violet-500/10 px-4 py-3.5 shadow-card">
                  {streamingContent ? (
                    <div className="text-sm font-body text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {streamingContent}
                      <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 align-middle animate-cursor" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-body">Consulting the celestial positions…</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center px-4">
            <div className="flex items-center gap-2 text-rose-400 bg-rose-950/20 border border-rose-900/30 rounded-xl px-4 py-2.5 text-xs font-body max-w-sm">
              <span>⚠</span> {error}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="px-4 pb-4 pt-3 border-t border-violet-500/08 bg-cosmic-900/20 flex-shrink-0">
        <ChatInput
          onSend={handleSend}
          onCancel={cancelStream}
          isLoading={isLoading}
          prefillValue={isTyping ? typingText : undefined}
        />
        <div className="text-center mt-2">
          <span className="text-[10px] font-body text-slate-700">All readings are for reflection and guidance only.</span>
        </div>
      </div>
    </div>
  );
}
