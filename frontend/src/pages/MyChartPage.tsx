import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, cardVariants } from '../lib/animations';
import { useAppStore } from '../store/appStore';
import { PlacementCard, ElementBalance, HouseGrid } from '../components/chart/PlacementCard';
import { PLANET_INFO, PERSONAL_PLANETS, SOCIAL_PLANETS, OUTER_PLANETS } from '../lib/constants';

export default function MyChartPage() {
  const { computedChart, birthDetails, setActivePage } = useAppStore();

  if (!birthDetails) {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-10 text-center max-w-md">
          <div className="text-4xl mb-4">◉</div>
          <h2 className="font-display text-2xl font-semibold text-slate-100 mb-2">No Chart Yet</h2>
          <p className="text-sm font-body text-slate-500 mb-5">Enter your birth details to generate your unique natal chart.</p>
          <button onClick={() => setActivePage('settings')} className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
            Set Up My Chart
          </button>
        </div>
      </motion.div>
    );
  }

  if (!computedChart) {
    return (
      <motion.div variants={pageVariants} initial="initial" animate="animate" className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-10 text-center max-w-md">
          <div className="text-4xl mb-4">◉</div>
          <h2 className="font-display text-2xl font-semibold text-slate-100 mb-2">Chart Not Computed</h2>
          <p className="text-sm font-body text-slate-500 mb-5">Ask Aradhana to compute your birth chart to see your natal placements.</p>
          <button onClick={() => setActivePage('chat')} className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-body text-sm transition-all">
            Ask Aradhana
          </button>
        </div>
      </motion.div>
    );
  }

  const chart = computedChart;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="p-6 max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-slate-100">{birthDetails.name}'s Natal Chart</h1>
        <p className="text-sm font-body text-slate-500 mt-1">
          {birthDetails.date} · {birthDetails.time} · {birthDetails.place}
        </p>
      </div>

      <motion.div variants={containerVariants} initial="initial" animate="animate" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Key Placements */}
        <div className="lg:col-span-2 space-y-5">
          {/* Big Three */}
          <motion.div variants={cardVariants} className="glass-card p-5">
            <div className="label text-slate-600 mb-4">The Big Three</div>
            <div className="space-y-2.5">
              {[
                { name: 'Sun', placement: chart.planets['sun'] || chart.planets['Sun'] },
                { name: 'Moon', placement: chart.planets['moon'] || chart.planets['Moon'] },
                { name: 'Ascendant', placement: chart.ascendant },
              ].filter(p => p.placement).map(p => (
                <PlacementCard key={p.name} name={p.name.toLowerCase()} placement={p.placement} />
              ))}
            </div>
          </motion.div>

          {/* Personal Planets */}
          <motion.div variants={cardVariants} className="glass-card p-5">
            <div className="label text-slate-600 mb-4">Personal Planets</div>
            <div className="space-y-2">
              {PERSONAL_PLANETS.filter(p => p !== 'sun' && p !== 'moon').map(planet => {
                const placement = chart.planets[planet] || chart.planets[planet.charAt(0).toUpperCase() + planet.slice(1)];
                return placement ? <PlacementCard key={planet} name={planet} placement={placement} /> : null;
              })}
            </div>
          </motion.div>

          {/* Social + Outer Planets */}
          <motion.div variants={cardVariants} className="glass-card p-5">
            <div className="label text-slate-600 mb-4">Outer Planets & Angles</div>
            <div className="space-y-2">
              {[...SOCIAL_PLANETS, ...OUTER_PLANETS].map(planet => {
                const placement = chart.planets[planet] || chart.planets[planet.charAt(0).toUpperCase() + planet.slice(1)];
                return placement ? <PlacementCard key={planet} name={planet} placement={placement} /> : null;
              })}
              {chart.midheaven && <PlacementCard name="midheaven" placement={chart.midheaven} />}
            </div>
          </motion.div>
        </div>

        {/* Right: Element balance + Houses */}
        <div className="space-y-5">
          <motion.div variants={cardVariants} className="glass-card p-5">
            <ElementBalance chart={chart} />
          </motion.div>
          <motion.div variants={cardVariants} className="glass-card p-5">
            <HouseGrid houses={chart.houses} />
          </motion.div>
          {/* Metadata */}
          <motion.div variants={cardVariants} className="glass-card p-4">
            <div className="label text-slate-600 mb-2">Chart Metadata</div>
            <div className="space-y-1.5">
              {[
                { label: 'Lat / Long', value: `${chart.metadata.lat.toFixed(2)}°, ${chart.metadata.lon.toFixed(2)}°` },
                { label: 'Timezone', value: chart.metadata.timezone },
                { label: 'System', value: 'Equal Houses' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[11px] font-body text-slate-600">{label}</span>
                  <span className="text-[11px] font-code text-slate-400">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
