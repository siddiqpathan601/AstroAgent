import { motion } from 'framer-motion';
import { useMoonPhase } from '../../hooks/useMoonPhase';
import { cardVariants } from '../../lib/animations';
import { SIGN_EMOJIS } from '../../lib/constants';

export default function MoonPhaseWidget() {
  const moon = useMoonPhase();

  const circumference = 2 * Math.PI * 22;
  const offset = circumference * (1 - moon.illumination / 100);

  return (
    <motion.div variants={cardVariants} className="glass-card p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="label text-slate-600 mb-1">Moon Phase</div>
          <h3 className="font-display text-lg font-semibold text-slate-100">{moon.phaseName}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-body text-slate-500">
              {SIGN_EMOJIS[moon.sign] || ''} Moon in {moon.sign}
            </span>
          </div>
        </div>
        {/* Circular illumination arc */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg width="56" height="56" className="rotate-[-90deg]">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="3" />
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(245,200,66,0.7)" strokeWidth="3"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl leading-none">{moon.emoji}</span>
          </div>
        </div>
      </div>

      {/* Illumination + next full moon */}
      <div className="flex items-center justify-between">
        <div>
          <div className="label text-slate-600">Illumination</div>
          <div className="text-sm font-body font-semibold text-gold-400">{moon.illumination}%</div>
        </div>
        <div className="text-right">
          <div className="label text-slate-600">Next Full Moon</div>
          <div className="text-sm font-body font-semibold text-slate-300">
            {moon.daysToFullMoon <= 0 ? 'Tonight' : `${moon.daysToFullMoon}d away`}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-3 pt-3 border-t border-violet-500/08">
        <p className="text-xs text-slate-500 font-body italic">{moon.description}</p>
      </div>
    </motion.div>
  );
}
