import { useState, useRef, useCallback, useEffect } from 'react';
import { streamChat } from '../services/api';
import { useAppStore } from '../store/appStore';
import type { Message, ToolCallEvent } from '../types/chat';
import type { BirthDetails } from '../types/user';
import { FOLLOW_UP_BY_INTENT } from '../lib/constants';

function detectIntent(toolCalls: ToolCallEvent[]): string {
  if (!toolCalls.length) return 'general';
  const name = toolCalls[0]?.name || '';
  if (name.includes('birth_chart') || name.includes('compute')) return 'birth_chart';
  if (name.includes('transit')) return 'daily_transit';
  if (name.includes('knowledge')) return 'astrology_question';
  return 'general';
}

function getFollowUps(toolCalls: ToolCallEvent[]): string[] {
  const intent = detectIntent(toolCalls);
  const list = FOLLOW_UP_BY_INTENT[intent] || FOLLOW_UP_BY_INTENT.general;
  // Return 3 random suggestions
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function useChat(birthDetails: BirthDetails | null) {
  const { messages, addMessage, clearMessages, setComputedChart, setComputedTransits } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [streamingToolCalls, setStreamingToolCalls] = useState<ToolCallEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isLoading, streamingContent, scrollToBottom]);

  const buildHistory = useCallback(() =>
    messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.content })),
    [messages]
  );

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg: Message = {
      id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      sender: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    addMessage(userMsg);
    setIsLoading(true);
    setError(null);
    setStreamingContent('');
    setStreamingToolCalls([]);

    const history = buildHistory();

    await streamChat(
      trimmed,
      birthDetails,
      history,
      (tool: ToolCallEvent) => {
        setStreamingToolCalls((prev) => [...prev, tool]);
        if (tool.name === 'compute_birth_chart' && tool.output?.chart) {
          setComputedChart(tool.output.chart);
        }
        if (tool.name === 'get_daily_transits' && tool.output) {
          setComputedTransits(tool.output);
        }
      },
      (token: string) => setStreamingContent((prev) => prev + token),
      () => {
        setStreamingContent((current) => {
          setStreamingToolCalls((tools) => {
            const agentMsg: Message = {
              id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
              sender: 'agent',
              content: current,
              timestamp: new Date().toISOString(),
              toolCalls: tools.length > 0 ? tools : undefined,
              followUps: getFollowUps(tools),
            };
            addMessage(agentMsg);
            return [];
          });
          return '';
        });
        setIsLoading(false);
      },
      (err: string) => {
        setError(err);
        setIsLoading(false);
        setStreamingContent('');
        setStreamingToolCalls([]);
      },
      controller.signal
    );
  }, [isLoading, birthDetails, buildHistory, addMessage, setComputedChart, setComputedTransits]);

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setStreamingContent('');
    setStreamingToolCalls([]);
  }, []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    clearMessages();
    setStreamingContent('');
    setStreamingToolCalls([]);
    setError(null);
    setIsLoading(false);
    setComputedChart(null);
    setComputedTransits(null);
  }, [clearMessages, setComputedChart, setComputedTransits]);

  return {
    messages,
    isLoading,
    streamingContent,
    streamingToolCalls,
    error,
    messagesEndRef,
    sendMessage,
    cancelStream,
    resetChat,
  };
}
