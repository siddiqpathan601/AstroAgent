import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'fire' | 'earth' | 'air' | 'water' | 'violet' | 'gold' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center gap-1 rounded-full border font-body font-medium';

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variants = {
    fire:    'bg-amber-500/10 border-amber-500/20 text-amber-300',
    earth:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    air:     'bg-sky-500/10 border-sky-500/20 text-sky-300',
    water:   'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-300',
    gold:    'bg-gold-500/10 border-gold-500/20 text-gold-400',
    default: 'bg-white/5 border-white/10 text-slate-400',
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Aspect badge
interface AspectBadgeProps { aspect: string; className?: string; }
export function AspectBadge({ aspect, className = '' }: AspectBadgeProps) {
  const cssClass: Record<string, string> = {
    conjunction: 'aspect-conjunction',
    sextile:     'aspect-sextile',
    trine:       'aspect-trine',
    square:      'aspect-square',
    opposition:  'aspect-opposition',
    quincunx:    'aspect-quincunx',
  };
  const cls = cssClass[aspect.toLowerCase()] || 'bg-white/5 border-white/10 text-slate-400';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-code font-medium capitalize ${cls} ${className}`}>
      {aspect}
    </span>
  );
}

// Streak badge
interface StreakBadgeProps { streak: number; }
export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak < 1) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-300 text-xs font-body font-medium">
      🔥 {streak} day{streak !== 1 ? 's' : ''}
    </span>
  );
}
