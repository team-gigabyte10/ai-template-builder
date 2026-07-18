'use client';

import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  showText = true,
  size = 'md',
}: {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const text =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'relative grid place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-glow',
          dim
        )}
      >
        <Sparkles className="h-1/2 w-1/2" strokeWidth={2.5} />
      </div>
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight text-foreground',
            text
          )}
        >
          DocumentOS
          <span className="text-primary"> AI</span>
        </span>
      )}
    </div>
  );
}
