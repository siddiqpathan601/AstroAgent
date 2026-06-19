import { useMemo } from 'react';
import { getMoonPhase, getNextFullMoon, type MoonPhaseResult } from '../services/moonCalc';

interface UseMoonPhaseResult extends MoonPhaseResult {
  nextFullMoon: Date;
  daysToFullMoon: number;
}

export function useMoonPhase(date: Date = new Date()): UseMoonPhaseResult {
  return useMemo(() => {
    const phase = getMoonPhase(date);
    const nextFull = getNextFullMoon(date);
    const daysToFullMoon = Math.ceil((nextFull.getTime() - date.getTime()) / 86400000);
    return { ...phase, nextFullMoon: nextFull, daysToFullMoon };
  }, [date.toDateString()]);
}
