// Types for chat and AI interaction

export interface ToolCallEvent {
  name: string;
  input: Record<string, unknown>;
  output_summary: string;
  output?: any;
  ms: number;
  error?: string | null;
}

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  toolCalls?: ToolCallEvent[];
  saved?: boolean;
  followUps?: string[];
}

export interface ConversationSession {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  messageCount: number;
  messages: Message[];
}

export interface SavedReading {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  tags?: string[];
}
