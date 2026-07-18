'use client';

import { ZoomIn, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export function EditorStatusBar({ zoom }: { zoom: number }) {
  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t bg-card px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <ZoomIn className="h-3 w-3" /> {zoom}%
        </span>
        <span className="flex items-center gap-1">
          <FileText className="h-3 w-3" /> 800 × 450 px
        </span>
        <span>Page 1 of 6</span>
        <span className="hidden sm:inline">· 248 words</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-success">
          <CheckCircle2 className="h-3 w-3" /> All changes saved
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <Sparkles className="h-3 w-3 text-primary" /> AI ready
        </span>
      </div>
    </footer>
  );
}
