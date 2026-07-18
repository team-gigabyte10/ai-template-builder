'use client';

import { cn } from '@/lib/utils';

const gradients: Record<string, string> = {
  'gradient-1': 'from-blue-500 via-indigo-500 to-cyan-400',
  'gradient-2': 'from-emerald-500 via-teal-500 to-cyan-400',
  'gradient-3': 'from-amber-500 via-orange-500 to-rose-400',
  'gradient-4': 'from-rose-500 via-pink-500 to-fuchsia-400',
  'gradient-5': 'from-indigo-500 via-blue-500 to-sky-400',
  'gradient-6': 'from-violet-500 via-purple-500 to-indigo-400',
  'gradient-7': 'from-yellow-400 via-amber-500 to-orange-400',
  'gradient-8': 'from-sky-500 via-indigo-500 to-blue-400',
};

export function GradientThumb({
  id,
  className,
  label,
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const g = gradients[id] ?? gradients['gradient-1'];
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-br',
        g,
        className
      )}
    >
      <div className="absolute inset-0 opacity-30 grid-pattern" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-black/10 blur-2xl" />
      {label && (
        <div className="absolute inset-x-0 bottom-0 p-3 text-xs font-medium text-white/90">
          {label}
        </div>
      )}
    </div>
  );
}
