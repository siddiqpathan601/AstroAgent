// ── Moon Phase Service (client-side calculation) ──────────────────────────────
// Based on the Julian Date algorithm — no external dependency required

export interface MoonPhaseResult {
  phaseName: string;
  phaseIndex: number;   // 0–7 (New, WaxCres, FirstQ, WaxGib, Full, WanGib, LastQ, WanCres)
  emoji: string;
  illumination: number; // 0–100 %
  sign: string;
  description: string;
  daysSinceNew: number;
}

const PHASE_NAMES = [
  'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
  'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent',
];
const PHASE_EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
const PHASE_DESCRIPTIONS = [
  'Plant new intentions and begin fresh', 'Build momentum, take first steps',
  'Take decisive action now', 'Refine your work and adjust course',
  'Celebrate culmination, release what no longer serves', 'Express gratitude and share gifts',
  'Release, forgive, and let go', 'Rest, reflect, and integrate',
];

// Zodiac signs for moon (roughly 2.5 days each)
const MOON_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function julianDate(date: Date): number {
  const Y = date.getUTCFullYear();
  const M = date.getUTCMonth() + 1;
  const D = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60) / 24;
  let JD = 367 * Y - Math.trunc(7 * (Y + Math.trunc((M + 9) / 12)) / 4)
    + Math.trunc(275 * M / 9) + D + 1721013.5;
  return JD;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseResult {
  const JD = julianDate(date);
  // Known new moon reference: Jan 6, 2000 18:14 UTC → JD 2451549.75
  const knownNewMoon = 2451549.75;
  const synodicPeriod = 29.53058867; // days
  
  const daysSinceNew = ((JD - knownNewMoon) % synodicPeriod + synodicPeriod) % synodicPeriod;
  const phaseIndex = Math.floor((daysSinceNew / synodicPeriod) * 8) % 8;
  const illumination = Math.round(
    50 * (1 - Math.cos((daysSinceNew / synodicPeriod) * 2 * Math.PI))
  );

  // Moon sign (rough: full cycle ≈ 27.3 days through 12 signs)
  const moonLong = ((JD - knownNewMoon) / 27.321661) * 360;
  const signIndex = Math.floor(((moonLong % 360) + 360) % 360 / 30);
  const sign = MOON_SIGNS[signIndex] || 'Aries';

  return {
    phaseName:    PHASE_NAMES[phaseIndex],
    phaseIndex,
    emoji:        PHASE_EMOJIS[phaseIndex],
    illumination,
    sign,
    description:  PHASE_DESCRIPTIONS[phaseIndex],
    daysSinceNew: Math.round(daysSinceNew * 10) / 10,
  };
}

export function getNextFullMoon(date: Date = new Date()): Date {
  const JD = julianDate(date);
  const knownNewMoon = 2451549.75;
  const synodicPeriod = 29.53058867;
  const daysSinceNew = ((JD - knownNewMoon) % synodicPeriod + synodicPeriod) % synodicPeriod;
  const daysToFull = daysSinceNew < 14.765
    ? 14.765 - daysSinceNew
    : synodicPeriod - daysSinceNew + 14.765;
  return new Date(date.getTime() + daysToFull * 86400000);
}
