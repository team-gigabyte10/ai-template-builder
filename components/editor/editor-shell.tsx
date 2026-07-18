'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Palette,
  Eye,
  Play,
  Download,
  Share2,
  ChevronLeft,
  Sparkles,
  X,
  Layers,
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Shapes,
  ChartBar,
  Table,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { EditorLeftSidebar } from '@/components/editor/left-sidebar';
import { EditorRightPanel } from '@/components/editor/right-panel';
import { EditorCanvas } from '@/components/editor/canvas';
import { EditorStatusBar } from '@/components/editor/status-bar';
import { AiAssistantPanel } from '@/components/editor/ai-assistant';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';

const leftTabs = [
  { id: 'pages', label: 'Pages', icon: Layers },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'images', label: 'Images', icon: ImageIcon },
  { id: 'icons', label: 'Icons', icon: Shapes },
  { id: 'charts', label: 'Charts', icon: ChartBar },
  { id: 'tables', label: 'Tables', icon: Table },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'brand', label: 'Brand Kit', icon: Palette },
];

export function EditorShell({ docId }: { docId: string }) {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState('pages');
  const [zoom, setZoom] = useState(100);
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card/80 px-3 backdrop-blur-xl">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/dashboard/documents">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Logo showText={false} size="sm" />
        <div className="ml-1 hidden items-center gap-1.5 sm:flex">
          <span className="text-sm font-medium text-foreground">
            Untitled Document
          </span>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Draft
          </span>
        </div>

        <div className="mx-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info('Undo')}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info('Redo')}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom((z) => Math.max(25, z - 10))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-xs font-medium tabular-nums">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="sm" className="h-8" onClick={() => toast.info('Theme panel')}>
            <Palette className="mr-1 h-4 w-4" /> Theme
          </Button>
          <Button variant="ghost" size="sm" className="h-8" onClick={() => toast.info('Preview mode')}>
            <Eye className="mr-1 h-4 w-4" /> Preview
          </Button>
          <Button variant="default" size="sm" className="h-8" onClick={() => toast.info('Present mode')}>
            <Play className="mr-1 h-4 w-4" /> Present
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant={aiOpen ? 'default' : 'outline'}
            size="sm"
            className="h-8"
            onClick={() => setAiOpen(!aiOpen)}
          >
            <Sparkles className="mr-1 h-4 w-4" /> AI
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => toast.success('Export started')}>
            <Download className="mr-1 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => toast.success('Share link copied')}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <ThemeToggle className="h-8 w-8" />
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="flex w-14 shrink-0 flex-col items-center gap-1 border-r bg-card py-3">
          {leftTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  'group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
                title={t.label}
              >
                <Icon className="h-4 w-4" />
                <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs shadow-md group-hover:block">
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hidden w-64 shrink-0 border-r bg-card md:block">
          <EditorLeftSidebar tab={activeTab} />
        </div>

        <div className="relative flex-1 overflow-hidden bg-muted/30">
          <EditorCanvas zoom={zoom} />
        </div>

        <div className="hidden w-72 shrink-0 border-l bg-card lg:block">
          <EditorRightPanel />
        </div>

        <AnimatePresence>
          {aiOpen && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 z-30 h-full w-[340px] border-l bg-card shadow-xl"
            >
              <AiAssistantPanel onClose={() => setAiOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EditorStatusBar zoom={zoom} />
    </div>
  );
}
