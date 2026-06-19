import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Compass, Moon, BookOpen } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { bottomNavVariants } from '../../lib/animations';
import type { AppPage } from '../../types/user';

const TAB_ITEMS: { id: AppPage; label: string; icon: React.ElementType }[] = [
  { id: 'today',   label: 'Today',  icon: Star },
  { id: 'chart',   label: 'Chart',  icon: Compass },
  { id: 'chat',    label: 'Ask',    icon: MessageCircle },
  { id: 'moon',    label: 'Moon',   icon: Moon },
  { id: 'journal', label: 'Journal',icon: BookOpen },
];

export default function BottomNav() {
  const { activePage, setActivePage } = useAppStore();

  return (
    <motion.nav
      variants={bottomNavVariants}
      initial="initial"
      animate="animate"
      className="bottom-nav fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around pb-safe pt-2 px-2 md:hidden"
    >
      {TAB_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center gap-1 flex-1 py-1.5 px-2 rounded-xl transition-all duration-200 min-h-[44px] justify-center
              ${isActive ? 'text-violet-300' : 'text-slate-600 hover:text-slate-400'}`}
          >
            <div className="relative">
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 -m-1.5 rounded-xl bg-violet-500/15"
                />
              )}
              <Icon size={20} className="relative z-10" />
            </div>
            <span className="text-[10px] font-body font-medium relative z-10">{item.label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
}
