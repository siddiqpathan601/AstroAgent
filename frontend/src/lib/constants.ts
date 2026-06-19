import { SignInfo, Element } from '../types/chart';

// ── Zodiac Signs ──────────────────────────────────────────────────────────────
export const SIGN_EMOJIS: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

export const SIGN_INFO: Record<string, SignInfo> = {
  Aries:       { element: 'Fire',  quality: 'Cardinal', ruler: 'Mars',    glyph: '♈' },
  Taurus:      { element: 'Earth', quality: 'Fixed',    ruler: 'Venus',   glyph: '♉' },
  Gemini:      { element: 'Air',   quality: 'Mutable',  ruler: 'Mercury', glyph: '♊' },
  Cancer:      { element: 'Water', quality: 'Cardinal', ruler: 'Moon',    glyph: '♋' },
  Leo:         { element: 'Fire',  quality: 'Fixed',    ruler: 'Sun',     glyph: '♌' },
  Virgo:       { element: 'Earth', quality: 'Mutable',  ruler: 'Mercury', glyph: '♍' },
  Libra:       { element: 'Air',   quality: 'Cardinal', ruler: 'Venus',   glyph: '♎' },
  Scorpio:     { element: 'Water', quality: 'Fixed',    ruler: 'Pluto',   glyph: '♏' },
  Sagittarius: { element: 'Fire',  quality: 'Mutable',  ruler: 'Jupiter', glyph: '♐' },
  Capricorn:   { element: 'Earth', quality: 'Cardinal', ruler: 'Saturn',  glyph: '♑' },
  Aquarius:    { element: 'Air',   quality: 'Fixed',    ruler: 'Uranus',  glyph: '♒' },
  Pisces:      { element: 'Water', quality: 'Mutable',  ruler: 'Neptune', glyph: '♓' },
};

// ── Element Colors ────────────────────────────────────────────────────────────
export const ELEMENT_COLORS: Record<Element, { text: string; bg: string; border: string; dot: string }> = {
  Fire:  { text: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   dot: 'bg-amber-400' },
  Earth: { text: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  Air:   { text: 'text-sky-300',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     dot: 'bg-sky-400' },
  Water: { text: 'text-indigo-300',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20',  dot: 'bg-indigo-400' },
};

// ── Planet Info ───────────────────────────────────────────────────────────────
export const PLANET_INFO: Record<string, { glyph: string; description: string; color: string }> = {
  sun:     { glyph: '☉', description: 'Core identity & purpose',       color: 'text-amber-300' },
  moon:    { glyph: '☽', description: 'Emotional core & intuition',    color: 'text-slate-300' },
  mercury: { glyph: '☿', description: 'Communication & logic',         color: 'text-sky-300' },
  venus:   { glyph: '♀', description: 'Love, values & aesthetics',     color: 'text-pink-300' },
  mars:    { glyph: '♂', description: 'Drive, action & energy',        color: 'text-red-400' },
  jupiter: { glyph: '♃', description: 'Expansion, luck & wisdom',      color: 'text-amber-200' },
  saturn:  { glyph: '♄', description: 'Structure & discipline',        color: 'text-slate-400' },
  uranus:  { glyph: '♅', description: 'Rebellion & innovation',        color: 'text-cyan-300' },
  neptune: { glyph: '♆', description: 'Dreams, mysticism & illusion',  color: 'text-blue-300' },
  pluto:   { glyph: '♇', description: 'Transformation & power',        color: 'text-violet-400' },
  ascendant: { glyph: 'AS', description: 'Outward persona & rising sign', color: 'text-indigo-300' },
  midheaven: { glyph: 'MC', description: 'Career & public calling',       color: 'text-violet-300' },
};

// ── Personal vs Outer Planets ──────────────────────────────────────────────────
export const PERSONAL_PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars'];
export const SOCIAL_PLANETS   = ['jupiter', 'saturn'];
export const OUTER_PLANETS    = ['uranus', 'neptune', 'pluto'];

// ── Aspect Info ───────────────────────────────────────────────────────────────
export const ASPECT_INFO: Record<string, { label: string; cssClass: string; energy: string; degrees: number }> = {
  conjunction: { label: 'Conjunction', cssClass: 'aspect-conjunction', energy: 'Amplifying',  degrees: 0   },
  sextile:     { label: 'Sextile',     cssClass: 'aspect-sextile',     energy: 'Harmonious',  degrees: 60  },
  square:      { label: 'Square',      cssClass: 'aspect-square',      energy: 'Challenging', degrees: 90  },
  trine:       { label: 'Trine',       cssClass: 'aspect-trine',       energy: 'Flowing',     degrees: 120 },
  quincunx:    { label: 'Quincunx',    cssClass: 'aspect-quincunx',    energy: 'Adjusting',   degrees: 150 },
  opposition:  { label: 'Opposition',  cssClass: 'aspect-opposition',  energy: 'Polarizing',  degrees: 180 },
};

// ── House Themes ──────────────────────────────────────────────────────────────
export const HOUSE_THEMES: Record<number, string> = {
  1: 'Self & Identity', 2: 'Values & Resources', 3: 'Communication',
  4: 'Home & Roots',    5: 'Creativity & Joy',    6: 'Health & Service',
  7: 'Partnerships',    8: 'Transformation',       9: 'Philosophy',
  10: 'Career & Legacy', 11: 'Community & Hopes', 12: 'Hidden & Spiritual',
};

// ── Moon Phases ───────────────────────────────────────────────────────────────
export const MOON_PHASES = [
  { name: 'New Moon',       emoji: '🌑', description: 'Plant intentions' },
  { name: 'Waxing Crescent',emoji: '🌒', description: 'Build momentum' },
  { name: 'First Quarter',  emoji: '🌓', description: 'Take decisive action' },
  { name: 'Waxing Gibbous', emoji: '🌔', description: 'Refine and adjust' },
  { name: 'Full Moon',      emoji: '🌕', description: 'Culmination & release' },
  { name: 'Waning Gibbous', emoji: '🌖', description: 'Express gratitude' },
  { name: 'Last Quarter',   emoji: '🌗', description: 'Release and let go' },
  { name: 'Waning Crescent',emoji: '🌘', description: 'Rest & reflect' },
];

// ── Navigation Items ──────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'today',        label: 'Today',         icon: '✦', emoji: '🌟' },
  { id: 'chart',        label: 'My Chart',       icon: '◉', emoji: '◉'  },
  { id: 'chat',         label: 'Ask Aradhana',   icon: '◈', emoji: '💬' },
  { id: 'transits',     label: 'Transits',       icon: '⬡', emoji: '⬡'  },
  { id: 'moon',         label: 'Moon',           icon: '◐', emoji: '🌙' },
  { id: 'life-areas',   label: 'Life Areas',     icon: '⊡', emoji: '⊡'  },
  { id: 'compatibility',label: 'Compatibility',  icon: '♥', emoji: '♥'  },
  { id: 'journal',      label: 'Journal',        icon: '✎', emoji: '✎'  },
  { id: 'saved',        label: 'Saved',          icon: '◱', emoji: '🔖' },
  { id: 'history',      label: 'History',        icon: '◷', emoji: '🕐' },
] as const;

// ── Suggested Follow-up Questions by Intent ───────────────────────────────────
export const FOLLOW_UP_BY_INTENT: Record<string, string[]> = {
  birth_chart: [
    'What does this mean for my relationships?',
    'How does my rising sign influence me?',
    'What career path suits my chart?',
    'Tell me about my Moon placement',
    'What are my chart\'s dominant elements?',
  ],
  daily_transit: [
    'What should I focus on this week?',
    'Are there any challenging aspects today?',
    'How does this affect my love life?',
    'What ritual would help today?',
    'When will this transit end?',
  ],
  astrology_question: [
    'How does this affect my birth chart?',
    'Give me a real-world example',
    'What\'s the opposite of this in astrology?',
    'Is this common in my chart?',
  ],
  general: [
    'Show me my birth chart',
    'What are today\'s transits?',
    'What\'s the current moon phase?',
    'How is my energy today?',
  ],
};
