import type { TransitAspect } from '../types/chart';

// ── Cosmic Score: 0–100 based on active transit aspects ──────────────────────

const ASPECT_WEIGHTS: Record<string, number> = {
  trine:       +20,
  sextile:     +12,
  conjunction: +10,
  quincunx:    -5,
  square:      -12,
  opposition:  -15,
};

const PLANET_WEIGHTS: Record<string, number> = {
  sun: 1.5, moon: 1.4, venus: 1.2, mars: 1.0,
  jupiter: 1.3, mercury: 0.9, saturn: 0.8,
  uranus: 0.6, neptune: 0.5, pluto: 0.5,
};

export interface CosmicScoreResult {
  score: number;        // 0–100
  label: string;        // "Cosmic Flow", "Turbulent", etc.
  color: string;        // Tailwind class
  highlights: string[]; // Top 2 reasons
}

export function computeCosmicScore(aspects: TransitAspect[]): CosmicScoreResult {
  if (!aspects || aspects.length === 0) {
    return { score: 60, label: 'Neutral', color: 'text-slate-300', highlights: ['Steady cosmic energy today'] };
  }

  let raw = 60; // baseline neutral
  const highlights: string[] = [];

  for (const asp of aspects) {
    const weight = ASPECT_WEIGHTS[asp.aspect.toLowerCase()] ?? 0;
    const pWeight = PLANET_WEIGHTS[asp.transit_planet.toLowerCase()] ?? 0.7;
    const orbFactor = Math.max(0, 1 - asp.orb / 8); // tighter orb = stronger
    raw += weight * pWeight * orbFactor;

    // Collect notable aspects
    if (Math.abs(weight) >= 10 && asp.orb <= 3) {
      const verb = weight > 0 ? '✦' : '⚡';
      highlights.push(`${verb} ${asp.transit_planet} ${asp.aspect} natal ${asp.natal_planet}`);
    }
  }

  const score = Math.max(10, Math.min(100, Math.round(raw)));
  
  let label = 'Balanced';
  let color = 'text-slate-300';
  if (score >= 85) { label = 'Cosmic Flow';   color = 'text-gold-400'; }
  else if (score >= 70) { label = 'Favorable';    color = 'text-emerald-300'; }
  else if (score >= 55) { label = 'Balanced';     color = 'text-sky-300'; }
  else if (score >= 40) { label = 'Challenging';  color = 'text-amber-300'; }
  else                  { label = 'Turbulent';    color = 'text-rose-300'; }

  if (highlights.length === 0) highlights.push('Check your transits for details');

  return { score, label, color, highlights: highlights.slice(0, 2) };
}
