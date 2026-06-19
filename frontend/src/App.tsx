import React, { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './store/appStore';
import { useCommandPalette } from './hooks/useCommandPalette';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import CommandPalette from './components/layout/CommandPalette';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { Skeleton, SkeletonCard } from './components/ui/Skeleton';
import type { AppPage } from './types/user';

// Code-split pages
const TodayPage        = lazy(() => import('./pages/TodayPage'));
const ChatPage         = lazy(() => import('./pages/ChatPage'));
const MyChartPage      = lazy(() => import('./pages/MyChartPage'));
const TransitsPage     = lazy(() => import('./pages/TransitsPage'));
const LifeAreasPage    = lazy(() => import('./pages/LifeAreasPage'));
const MoonPhasePage    = lazy(() => import('./pages/MoonPhasePage'));
const JournalPage      = lazy(() => import('./pages/JournalPage'));
const SavedReadingsPage= lazy(() => import('./pages/SavedReadingsPage'));
const HistoryPage      = lazy(() => import('./pages/HistoryPage'));
const SettingsPage     = lazy(() => import('./pages/SettingsPage'));

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard />
      </div>
    }>
      {children}
    </Suspense>
  );
}

function PageRouter({ page }: { page: AppPage }) {
  return (
    <AnimatePresence mode="wait">
      <PageSuspense key={page}>
        {page === 'today'         && <TodayPage />}
        {page === 'chat'          && <ChatPage />}
        {page === 'chart'         && <MyChartPage />}
        {page === 'transits'      && <TransitsPage />}
        {page === 'life-areas'    && <LifeAreasPage />}
        {page === 'moon'          && <MoonPhasePage />}
        {page === 'journal'       && <JournalPage />}
        {page === 'saved'         && <SavedReadingsPage />}
        {page === 'history'       && <HistoryPage />}
        {page === 'settings'      && <SettingsPage />}
        {page === 'compatibility' && <CompatibilityPlaceholder />}
      </PageSuspense>
    </AnimatePresence>
  );
}

function CompatibilityPlaceholder() {
  return (
    <div className="p-6 max-w-2xl mx-auto text-center py-20">
      <div className="text-5xl mb-4">♥</div>
      <h2 className="font-display text-2xl text-slate-200 mb-2">Compatibility Analysis</h2>
      <p className="text-sm font-body text-slate-500">Synastry reports coming in a future update. Ask Aradhana about compatibility in the chat for now!</p>
    </div>
  );
}

export default function App() {
  const { activePage, onboardingComplete, sidebarExpanded } = useAppStore();

  // Register ⌘K handler
  useCommandPalette();

  // Show onboarding if not complete
  if (!onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-void text-slate-100 flex relative overflow-hidden">
      {/* Cosmic background glows */}
      <div className="fixed top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full bg-violet-950/20 cosmic-glow-1 pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-950/15 cosmic-glow-2 pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[10%] w-[300px] h-[300px] rounded-full bg-violet-900/10 cosmic-glow-3 pointer-events-none z-0" />

      {/* Sidebar (desktop) */}
      <div className="hidden md:block relative z-40 flex-shrink-0" style={{ width: sidebarExpanded ? 240 : 64 }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden z-10"
        style={{ paddingBottom: '80px' }} // space for bottom nav on mobile
      >
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-violet-500/08 glass-dark sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
              <span className="text-sm leading-none">☽</span>
            </div>
            <span className="font-display text-base font-semibold text-gradient-gold">Celestia</span>
          </div>
          <button
            onClick={() => useAppStore.getState().openCommandPalette()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg border border-violet-500/12 text-xs font-body text-slate-500 hover:text-slate-300 transition-all"
          >
            <span>⌘</span><span>K</span>
          </button>
        </div>

        {/* Desktop ⌘K hint in header */}
        <div className="hidden md:flex items-center justify-end px-6 py-3 border-b border-violet-500/06 flex-shrink-0">
          <button
            onClick={() => useAppStore.getState().openCommandPalette()}
            className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-violet-500/10 text-xs font-body text-slate-600 hover:text-slate-400 hover:border-violet-500/20 transition-all"
          >
            <span>⌘</span><span>K</span>
            <span className="ml-1 text-slate-700">Search</span>
          </button>
        </div>

        {/* Page content — scrollable */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden ${activePage === 'chat' ? 'flex flex-col' : ''}`}>
          <PageRouter page={activePage} />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* Command palette overlay */}
      <CommandPalette />
    </div>
  );
}
