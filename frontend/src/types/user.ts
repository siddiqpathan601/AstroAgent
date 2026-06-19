// Types for user profile and preferences

export interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  prompt?: string;
  tags?: string[];
}

export type AppPage =
  | 'today'
  | 'chat'
  | 'chart'
  | 'transits'
  | 'life-areas'
  | 'moon'
  | 'compatibility'
  | 'journal'
  | 'saved'
  | 'history'
  | 'settings';
