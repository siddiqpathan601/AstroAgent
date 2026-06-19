import { Variants } from 'framer-motion';

// ── Page Transitions ──────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -8, filter: 'blur(2px)',
    transition: { duration: 0.2 },
  },
};

// ── Card Stagger Container ────────────────────────────────────────────────────
export const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Message Bubbles ───────────────────────────────────────────────────────────
export const messageVariants: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
export const sidebarVariants: Variants = {
  open: {
    width: 240,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  closed: {
    width: 64,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const sidebarLabelVariants: Variants = {
  open:   { opacity: 1, x: 0,   transition: { duration: 0.2, delay: 0.1 } },
  closed: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

// ── Modal / Dialog ────────────────────────────────────────────────────────────
export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, scale: 0.97, y: 6,
    transition: { duration: 0.2 },
  },
};

// ── Command Palette ───────────────────────────────────────────────────────────
export const commandPaletteVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: -8 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, scale: 0.97, y: -4,
    transition: { duration: 0.15 },
  },
};

// ── Cosmic Pulse (orbs, planets) ──────────────────────────────────────────────
export const cosmicPulseVariants: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ── Follow-up chips ───────────────────────────────────────────────────────────
export const chipContainerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export const chipVariants: Variants = {
  initial: { opacity: 0, y: 8, scale: 0.9 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Skeleton Pulse ────────────────────────────────────────────────────────────
export const skeletonVariants: Variants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ── Bottom Nav ────────────────────────────────────────────────────────────────
export const bottomNavVariants: Variants = {
  initial: { y: 80, opacity: 0 },
  animate: {
    y: 0, opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

// ── Tooltip ───────────────────────────────────────────────────────────────────
export const tooltipVariants: Variants = {
  initial: { opacity: 0, x: -6, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.15 } },
  exit:    { opacity: 0, x: -4, scale: 0.97, transition: { duration: 0.1 } },
};
