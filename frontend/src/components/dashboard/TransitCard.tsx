import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../../lib/animations';
import { AspectBadge } from '../ui/Badge';
import { PLANET_INFO, SIGN_EMOJIS } from '../../lib/constants';
import type { TransitAspect, Placement } from '../../types/chart';
import { formatDegree } from '../../lib/formatters';

interface TransitCardProps {
  aspect: TransitAspect;
}

export function TransitCard({ aspect }: TransitCardProps) {
  const transitInfo = PLANET_INFO[aspect.transit_planet.toLowerCase()];
  const natalInfo = PLANET_INFO[aspect.natal_planet.toLowerCase()];

  return (
    <div className="flex items-start gap-3 p-3 bg-cosmic-800/30 border border-violet-500/06 rounded-xl hover:border-violet-500/15 transition-all">
      <div className="flex flex-col items-center gap-1 text-center flex-shrink-0 w-14">
        <span className="text-xl leading-none">{transitInfo?.glyph || aspect.transit_planet[0]}</span>
        <div className="text-[10px] font-code text-slate-500 capitalize">{aspect.transit_planet}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <AspectBadge aspect={aspect.aspect} />
          <span className="text-[10px] font-code text-slate-600">{aspect.orb.toFixed(1)}° orb</span>
        </div>
        <div className="text-xs font-body text-slate-400">
          <span className="text-slate-300 font-medium capitalize">{aspect.transit_planet}</span>
          <span className="text-slate-600 mx-1">→</span>
          <span className="text-slate-300 font-medium capitalize">{aspect.natal_planet}</span>
        </div>
        {aspect.description && (
          <p className="text-[11px] font-body text-slate-500 mt-1 leading-relaxed">{aspect.description}</p>
        )}
      </div>
    </div>
  );
}

interface TransitPositionGridProps {
  positions: Record<string, Placement>;
}

export function TransitPositionGrid({ positions }: TransitPositionGridProps) {
  const entries = Object.entries(positions);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {entries.map(([planet, pos]) => {
        const info = PLANET_INFO[planet.toLowerCase()];
        return (
          <div key={planet} className="p-2.5 bg-cosmic-800/20 border border-violet-500/06 rounded-xl">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`text-sm ${info?.color || 'text-slate-400'}`}>{info?.glyph || planet[0]}</span>
              <span className="text-[11px] font-body text-slate-500 capitalize">{planet}</span>
            </div>
            <div className="text-xs font-body font-semibold text-slate-200">{SIGN_EMOJIS[pos.sign]} {pos.sign}</div>
            <div className="text-[10px] font-code text-gold-400/80 mt-0.5">{formatDegree(pos.degree)}</div>
          </div>
        );
      })}
    </div>
  );
}
