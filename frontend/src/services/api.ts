/// <reference types="vite/client" />
import type { BirthDetails } from '../types/user';
import type { ToolCallEvent } from '../types/chat';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

export type { ToolCallEvent };

// ── Streaming chat via SSE ────────────────────────────────────────────────────

export async function streamChat(
  message: string,
  birthDetails: BirthDetails | null,
  history: { role: string; content: string }[],
  onToolCall: (tool: ToolCallEvent) => void,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        birth_details: birthDetails || null,
        history: history || [],
      }),
      signal,
    });

    if (!response.ok) {
      onError(`Server error: ${response.status} ${response.statusText}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) { onError('No response stream available'); return; }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const jsonStr = trimmed.slice(6);
        try {
          const data = JSON.parse(jsonStr);
          if (data.tool_call)  { onToolCall(data.tool_call); }
          else if (data.token) { onToken(data.token); }
          else if (data.done)  { onDone(); return; }
          else if (data.error) { onError(data.error); return; }
        } catch { /* skip malformed */ }
      }
    }

    onDone();
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') return;
    const msg = err instanceof Error ? err.message : String(err);
    onError(msg);
  }
}

// ── Health check ──────────────────────────────────────────────────────────────
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch { return false; }
}
