import { motion } from 'framer-motion';
import { cardVariants } from '../../lib/animations';
import { computeCosmicScore } from '../../services/cosmicScore';
import type { TransitAspect } from '../../types/chart';

interface CosmicScoreCardProps {
  aspects: TransitAspect[];
}

export default function CosmicScoreCard({ aspects }: CosmicScoreCardProps) {
  const { score, label, color, highlights } = computeCosmicScore(aspects);
  const pct = score / 100;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <motion.div variants={cardVariants} className="glass-card p-5 card-hover">
      <div className="label text-slate-600 mb-4">Today's Cosmic Score</div>
      <div className="flex items-center gap-5">
        {/* Circular score gauge */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg width="96" height="96" className="rotate-[-90deg]">
            <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="5" />
            <motion.circle
              cx="48" cy="48" r={radius} fill="none"
              stroke={score >= 70 ? 'rgba(245,200,66,0.8)' : score >= 50 ? 'rgba(139,92,246,0.7)' : 'rgba(251,113,133,0.6)'}
              strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className={`text-2xl font-display font-semibold ${color}`}
            >
              {score}
            </motion.span>
            <span className="text-[9px] font-body text-slate-600 uppercase tracking-wider">/ 100</span>
          </div>
        </div>
        {/* Label + highlights */}
        <div className="flex-1">
          <div className={`text-base font-display font-semibold ${color} mb-2`}>{label}</div>
          <div className="space-y-1.5">
            {highlights.map((h, i) => (
              <div key={i} className="text-xs font-body text-slate-400">{h}</div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
