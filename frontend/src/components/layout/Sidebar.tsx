import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MessageCircle, Compass, Calendar, Moon,
  Heart, BookOpen, Bookmark, Clock, Settings,
  ChevronRight, Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { sidebarVariants, sidebarLabelVariants } from '../../lib/animations';
import type { AppPage } from '../../types/user';

interface NavItem {
  id: AppPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'today',         label: 'Today',          icon: Star },
  { id: 'chat',          label: 'Ask Aradhana',    icon: MessageCircle },
  { id: 'chart',         label: 'My Chart',        icon: Compass },
  { id: 'transits',      label: 'Transits',        icon: Calendar },
  { id: 'moon',          label: 'Moon',            icon: Moon },
  { id: 'life-areas',    label: 'Life Areas',      icon: Sparkles },
  { id: 'compatibility', label: 'Compatibility',   icon: Heart },
  { id: 'journal',       label: 'Journal',         icon: BookOpen },
  { id: 'saved',         label: 'Saved',           icon: Bookmark },
  { id: 'history',       label: 'History',         icon: Clock },
];

export default function Sidebar() {
  const { sidebarExpanded, toggleSidebar, activePage, setActivePage, birthDetails, streak } = useAppStore();

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={sidebarExpanded ? 'open' : 'closed'}
      initial="closed"
      className="fixed left-0 top-0 h-screen z-40 flex flex-col glass-dark border-r border-violet-500/08 overflow-hidden sidebar-transition"
      style={{ width: sidebarExpanded ? 240 : 64 }}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-violet-500/08 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center flex-shrink-0 shadow-glow-sm">
          <span className="text-lg leading-none">☽</span>
        </div>
        <AnimatePresence>
          {sidebarExpanded && (
            <motion.div
              variants={sidebarLabelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              <span className="font-display text-lg font-semibold text-gradient-gold">Celestia</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActivePage(item.id)}
              title={!sidebarExpanded ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-200 group relative
                ${isActive
                  ? 'bg-violet-500/15 text-violet-300'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/4'}`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-400 rounded-r-full"
                />
              )}
              <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${isActive ? 'text-violet-300' : 'text-slate-500 group-hover:text-slate-300'}`} size={18} />
              <AnimatePresence>
                {sidebarExpanded && (
                  <motion.span
                    variants={sidebarLabelVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="text-sm font-body whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom: User + Settings */}
      <div className="p-2 border-t border-violet-500/08 flex-shrink-0 space-y-0.5">
        <button
          onClick={() => setActivePage('settings')}
          title={!sidebarExpanded ? 'Settings' : undefined}
          className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/4 transition-all duration-200"
        >
          <Settings size={18} className="flex-shrink-0" />
          <AnimatePresence>
            {sidebarExpanded && (
              <motion.span variants={sidebarLabelVariants} initial="closed" animate="open" exit="closed"
                className="text-sm font-body whitespace-nowrap">Settings</motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User chip */}
        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-700 to-violet-900 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-display text-violet-200">
              {birthDetails?.name?.[0]?.toUpperCase() || '✦'}
            </span>
          </div>
          <AnimatePresence>
            {sidebarExpanded && (
              <motion.div variants={sidebarLabelVariants} initial="closed" animate="open" exit="closed"
                className="flex-1 overflow-hidden min-w-0">
                <div className="text-xs font-body text-slate-200 truncate">{birthDetails?.name || 'Seeker'}</div>
                {streak > 0 && (
                  <div className="text-[10px] text-orange-400 font-body">🔥 {streak} day streak</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle — only show on hover when expanded */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full glass-elevated border border-violet-500/20 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 z-50"
        title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <motion.div animate={{ rotate: sidebarExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronRight size={12} />
        </motion.div>
      </button>
    </motion.aside>
  );
}
