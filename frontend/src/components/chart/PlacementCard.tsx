import React from 'react';
import { SIGN_EMOJIS, PLANET_INFO, SIGN_INFO, ELEMENT_COLORS } from '../../lib/constants';
import { formatDegree, capitalizePlanet } from '../../lib/formatters';
import { Badge } from '../ui/Badge';
import type { BirthChartData } from '../../types/chart';

interface PlacementCardProps {
  name: string;
  placement: { sign: string; degree: number };
  glyph?: string;
  description?: string;
}

export function PlacementCard({ name, placement, glyph, description }: PlacementCardProps) {
  const signInfo = SIGN_INFO[placement.sign];
  const elementColors = signInfo ? ELEMENT_COLORS[signInfo.element] : ELEMENT_COLORS['Air'];
  const planetInfo = PLANET_INFO[name.toLowerCase()];

  return (
    <div className="flex items-center justify-between p-3.5 bg-cosmic-800/25 border border-violet-500/06 rounded-xl hover:border-violet-500/15 transition-all group">
      <div className="flex items-center gap-3">
        {/* Planet glyph */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border text-base ${planetInfo?.color || 'text-slate-400'} bg-cosmic-700/40 border-violet-500/10`}>
          {glyph || planetInfo?.glyph || name[0].toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-body font-semibold text-slate-200 capitalize">{name}</div>
          {(description || planetInfo?.description) && (
            <div className="text-[11px] font-body text-slate-500">{description || planetInfo?.description}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2.5 text-right">
        <div>
          <div className="text-sm font-body font-bold text-slate-200">
            {SIGN_EMOJIS[placement.sign]} {placement.sign}
          </div>
          <div className="text-[11px] font-code text-gold-400/80">{formatDegree(placement.degree)}</div>
        </div>
        {signInfo && (
          <Badge variant={signInfo.element.toLowerCase() as any} size="sm">
            {signInfo.element}
          </Badge>
        )}
      </div>
    </div>
  );
}

interface ElementBalanceProps {
  chart: BirthChartData;
}

export function ElementBalance({ chart }: ElementBalanceProps) {
  const counts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const allPlanets = { ...chart.planets, ascendant: chart.ascendant, midheaven: chart.midheaven };
  
  for (const p of Object.values(allPlanets)) {
    const info = SIGN_INFO[p.sign];
    if (info) counts[info.element]++;
  }

  const total = Object.values(counts).reduce((s, c) => s + c, 0) || 1;
  const elements: ['Fire', 'Earth', 'Air', 'Water'] = ['Fire', 'Earth', 'Air', 'Water'];
  const elementEmojis: Record<string, string> = { Fire: '🔥', Earth: '🌿', Air: '💨', Water: '💧' };

  return (
    <div className="p-4 bg-cosmic-800/20 border border-violet-500/06 rounded-xl">
      <div className="label text-slate-600 mb-3">Elemental Balance</div>
      <div className="space-y-2">
        {elements.map((el) => {
          const colors = ELEMENT_COLORS[el];
          const pct = Math.round((counts[el] / total) * 100);
          return (
            <div key={el} className="flex items-center gap-3">
              <div className={`w-5 text-xs ${colors.text} flex-shrink-0`}>{elementEmojis[el]}</div>
              <div className="flex-1 h-2 bg-cosmic-700/40 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${colors.dot}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className={`text-[11px] font-code w-8 text-right ${colors.text}`}>{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface HouseGridProps {
  houses: Record<string, { sign: string; degree: number }>;
}

export function HouseGrid({ houses }: HouseGridProps) {
  return (
    <div>
      <div className="label text-slate-600 mb-3">House Cusps</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {Object.entries(houses).map(([house, pos]) => {
          const num = house.replace(/\D/g, '');
          const info = SIGN_INFO[pos.sign];
          const colors = info ? ELEMENT_COLORS[info.element] : ELEMENT_COLORS['Air'];
          return (
            <div key={house} className={`p-2.5 rounded-xl border ${colors.border} ${colors.bg} text-center`}>
              <div className="label text-slate-600 mb-1">H{num}</div>
              <div className={`text-xs font-body font-semibold ${colors.text}`}>{SIGN_EMOJIS[pos.sign]} {pos.sign}</div>
              <div className="text-[10px] font-code text-gold-400/70 mt-0.5">{formatDegree(pos.degree)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
