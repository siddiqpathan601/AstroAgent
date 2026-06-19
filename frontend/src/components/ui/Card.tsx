import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'elevated' | 'dark';
  hover?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export function Card({ children, className = '', variant = 'default', hover = false, onClick, animate = false }: CardProps) {
  const baseClass = 'rounded-2xl overflow-hidden';
  const variantClass = {
    default:  'glass-card',
    gold:     'glass-gold',
    elevated: 'glass-elevated',
    dark:     'glass-dark',
  }[variant];
  const hoverClass = hover ? 'card-hover cursor-pointer' : '';

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`${baseClass} ${variantClass} ${hoverClass} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClass} ${variantClass} ${hoverClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps { children: React.ReactNode; className?: string; }
export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`px-5 py-4 border-b border-violet-500/08 bg-cosmic-900/30 ${className}`}>{children}</div>;
}

interface CardBodyProps { children: React.ReactNode; className?: string; }
export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
