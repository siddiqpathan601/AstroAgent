
interface SkeletonProps {
  className?: string;
  lines?: number;
  circle?: boolean;
}

export function Skeleton({ className = '', lines, circle = false }: SkeletonProps) {
  if (lines) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'} ${className}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={`skeleton ${circle ? 'rounded-full' : 'rounded-xl'} ${className}`} />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass-card p-5 space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        <Skeleton circle className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton lines={3} />
    </div>
  );
}
