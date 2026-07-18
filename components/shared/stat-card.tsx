'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = 'primary',
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone?: 'primary' | 'accent' | 'success' | 'warning';
  index?: number;
}) {
  const tones: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all hover:shadow-glow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-foreground">
            {value}
          </p>
          {delta && (
            <p className="mt-1 text-xs font-medium text-success">{delta}</p>
          )}
        </div>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            tones[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
