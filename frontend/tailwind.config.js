/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Backgrounds — "Midnight Cosmos"
        void: '#03000F',
        cosmic: {
          950: '#03000F',
          900: '#07041E',
          800: '#0D0A2E',
          700: '#12103A',
          600: '#181548',
          500: '#231E6E',
        },
        // Brand — Celestial Gold
        gold: {
          300: '#FAE8A4',
          400: '#F7D873',
          500: '#F5C842',
          600: '#D4A317',
        },
        // Primary — Cosmic Violet
        violet: {
          950: '#1E0D4E',
          900: '#2D1470',
          800: '#4C1D95',
          700: '#5B21B6',
          600: '#6D28D9',
          500: '#7C3AED',
          400: '#8B5CF6',
          300: '#A78BFA',
          200: '#C4B5FD',
        },
        // Elements
        fire: '#F59E0B',
        earth: '#10B981',
        air: '#38BDF8',
        water: '#818CF8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xxs': ['11px', { lineHeight: '16px' }],
      },
      animation: {
        'cosmic-pulse': 'cosmicPulse 4s ease-in-out infinite',
        'star-float': 'starFloat 20s linear infinite',
        'glow-breathe': 'glowBreathe 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'orbit': 'orbit 30s linear infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        cosmicPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        starFloat: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-20px) rotate(360deg)' },
        },
        glowBreathe: {
          '0%, 100%': { filter: 'blur(40px)', opacity: '0.3' },
          '50%': { filter: 'blur(60px)', opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          from: { opacity: '0', filter: 'blur(4px)' },
          to: { opacity: '1', filter: 'blur(0px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(139, 92, 246, 0.15)',
        'glow-gold': '0 0 30px rgba(245, 200, 66, 0.12)',
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backdropBlur: {
        xs: '4px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '88': '352px',
        '120': '480px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
