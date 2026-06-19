import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthDetails, JournalEntry, AppPage } from '../types/user';
import type { BirthChartData, TransitData } from '../types/chart';
import type { Message, ConversationSession, SavedReading } from '../types/chat';

interface AppStore {
  // ── User Profile ────────────────────────────────────────────────────────────
  birthDetails: BirthDetails | null;
  setBirthDetails: (details: BirthDetails) => void;
  clearBirthDetails: () => void;

  // ── Onboarding ───────────────────────────────────────────────────────────────
  onboardingComplete: boolean;
  setOnboardingComplete: (v: boolean) => void;

  // ── Chart Data ───────────────────────────────────────────────────────────────
  computedChart: BirthChartData | null;
  setComputedChart: (chart: BirthChartData | null) => void;

  // ── Transits ──────────────────────────────────────────────────────────────────
  computedTransits: TransitData | null;
  setComputedTransits: (transits: TransitData | null) => void;
  lastTransitFetch: string | null;

  // ── Active Page ───────────────────────────────────────────────────────────────
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;

  // ── Sidebar UI ────────────────────────────────────────────────────────────────
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (v: boolean) => void;

  // ── Command Palette ───────────────────────────────────────────────────────────
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  // ── Streak & Engagement ───────────────────────────────────────────────────────
  streak: number;
  lastVisitDate: string | null;
  updateStreak: () => void;

  // ── Current Chat Messages ─────────────────────────────────────────────────────
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;

  // ── Pending Message (auto-send from other pages) ──────────────────────────────
  pendingMessage: string | null;
  setPendingMessage: (msg: string | null) => void;

  // ── Conversation History ──────────────────────────────────────────────────────
  conversationSessions: ConversationSession[];
  saveCurrentSession: (title: string) => void;

  // ── Saved Readings ────────────────────────────────────────────────────────────
  savedReadings: SavedReading[];
  saveReading: (reading: SavedReading) => void;
  deleteReading: (id: string) => void;

  // ── Journal ───────────────────────────────────────────────────────────────────
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, content: string) => void;
  deleteJournalEntry: (id: string) => void;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  sender: 'agent',
  content: "Namaste ✨ I am Aradhana, your cosmic companion. Ask me about your birth chart, today's celestial energies, or any astrology question.",
  timestamp: new Date().toISOString(),
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // ── User Profile ──────────────────────────────────────────────────────────
      birthDetails: null,
      setBirthDetails: (details) => set({ birthDetails: details }),
      clearBirthDetails: () => set({ birthDetails: null, computedChart: null, computedTransits: null }),

      // ── Onboarding ────────────────────────────────────────────────────────────
      onboardingComplete: false,
      setOnboardingComplete: (v) => set({ onboardingComplete: v }),

      // ── Chart Data ────────────────────────────────────────────────────────────
      computedChart: null,
      setComputedChart: (chart) => set({ computedChart: chart }),

      // ── Transits ──────────────────────────────────────────────────────────────
      computedTransits: null,
      lastTransitFetch: null,
      setComputedTransits: (transits) =>
        set({ computedTransits: transits, lastTransitFetch: new Date().toISOString() }),

      // ── Active Page ───────────────────────────────────────────────────────────
      activePage: 'today',
      setActivePage: (page) => set({ activePage: page }),

      // ── Sidebar ───────────────────────────────────────────────────────────────
      sidebarExpanded: false,
      toggleSidebar: () => set((s) => ({ sidebarExpanded: !s.sidebarExpanded })),
      setSidebarExpanded: (v) => set({ sidebarExpanded: v }),

      // ── Command Palette ───────────────────────────────────────────────────────
      commandPaletteOpen: false,
      openCommandPalette: () => set({ commandPaletteOpen: true }),
      closeCommandPalette: () => set({ commandPaletteOpen: false }),

      // ── Streak ────────────────────────────────────────────────────────────────
      streak: 0,
      lastVisitDate: null,
      updateStreak: () => {
        const { streak, lastVisitDate } = get();
        const today = new Date().toDateString();
        if (lastVisitDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = lastVisitDate === yesterday ? streak + 1 : 1;
        set({ streak: newStreak, lastVisitDate: today });
      },

      // ── Messages ──────────────────────────────────────────────────────────────
      messages: [WELCOME_MESSAGE],
      setMessages: (msgs) => set({ messages: msgs }),
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      clearMessages: () => set({ messages: [{ ...WELCOME_MESSAGE, timestamp: new Date().toISOString() }] }),

      // ── Pending Message ────────────────────────────────────────────────
      pendingMessage: null,
      setPendingMessage: (msg) => set({ pendingMessage: msg }),

      // ── Conversation Sessions ─────────────────────────────────────────────────
      conversationSessions: [],
      saveCurrentSession: (title) => {
        const { messages, conversationSessions } = get();
        if (messages.length <= 1) return;
        const session: ConversationSession = {
          id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
          title,
          preview: messages.find(m => m.sender === 'agent' && m.id !== 'welcome')?.content?.slice(0, 80) || '',
          timestamp: new Date().toISOString(),
          messageCount: messages.length,
          messages: [...messages],
        };
        set({ conversationSessions: [session, ...conversationSessions].slice(0, 50) });
      },

      // ── Saved Readings ────────────────────────────────────────────────────────
      savedReadings: [],
      saveReading: (reading) =>
        set((s) => ({ savedReadings: [reading, ...s.savedReadings] })),
      deleteReading: (id) =>
        set((s) => ({ savedReadings: s.savedReadings.filter((r) => r.id !== id) })),

      // ── Journal ───────────────────────────────────────────────────────────────
      journalEntries: [],
      addJournalEntry: (entry) =>
        set((s) => ({ journalEntries: [entry, ...s.journalEntries] })),
      updateJournalEntry: (id, content) =>
        set((s) => ({
          journalEntries: s.journalEntries.map((e) =>
            e.id === id ? { ...e, content } : e
          ),
        })),
      deleteJournalEntry: (id) =>
        set((s) => ({ journalEntries: s.journalEntries.filter((e) => e.id !== id) })),
    }),
    {
      name: 'celestia-store',
      partialize: (state) => ({
        birthDetails: state.birthDetails,
        onboardingComplete: state.onboardingComplete,
        computedChart: state.computedChart,
        computedTransits: state.computedTransits,
        lastTransitFetch: state.lastTransitFetch,
        streak: state.streak,
        lastVisitDate: state.lastVisitDate,
        messages: state.messages,
        conversationSessions: state.conversationSessions,
        savedReadings: state.savedReadings,
        journalEntries: state.journalEntries,
      }),
    }
  )
);
