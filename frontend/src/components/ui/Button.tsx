import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:ring-offset-1 focus:ring-offset-transparent disabled:opacity-40 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs min-h-[32px]',
    md: 'px-4 py-2.5 text-sm min-h-[40px]',
    lg: 'px-6 py-3.5 text-sm min-h-[48px]',
  };

  const variants = {
    primary:   'bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-sm hover:shadow-glow-sm',
    secondary: 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 text-slate-200',
    ghost:     'text-slate-400 hover:text-slate-200 hover:bg-white/5',
    gold:      'bg-gold-500/10 border border-gold-500/20 text-gold-400 hover:bg-gold-500/20 hover:border-gold-500/30',
    danger:    'text-rose-400 hover:bg-rose-500/10 hover:text-rose-300',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
      {iconRight && !loading && iconRight}
    </motion.button>
  );
}
