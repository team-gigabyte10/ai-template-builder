'use client';

import { motion } from 'framer-motion';
import {
  Type,
  Heading1,
  Heading2,
  Square,
  Circle,
  Triangle,
  Image as ImageIcon,
  Plus,
  Star,
  Upload,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { GradientThumb } from '@/components/shared/gradient-thumb';
import { templates } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const pages = [
  { id: 'p1', thumb: 'gradient-1', title: 'Cover' },
  { id: 'p2', thumb: 'gradient-3', title: 'Problem' },
  { id: 'p3', thumb: 'gradient-5', title: 'Solution' },
  { id: 'p4', thumb: 'gradient-2', title: 'Market' },
  { id: 'p5', thumb: 'gradient-4', title: 'Traction' },
  { id: 'p6', thumb: 'gradient-6', title: 'Team' },
];

export function EditorLeftSidebar({ tab }: { tab: string }) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {tab === 'pages' && <PagesTab />}
        {tab === 'templates' && <TemplatesTab />}
        {tab === 'text' && <TextTab />}
        {tab === 'images' && <ImagesTab />}
        {tab === 'icons' && <IconsTab />}
        {tab === 'charts' && <ChartsTab />}
        {tab === 'tables' && <TablesTab />}
        {tab === 'uploads' && <UploadsTab />}
        {tab === 'brand' && <BrandTab />}
      </div>
    </ScrollArea>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function PagesTab() {
  return (
    <div>
      <SectionTitle>Pages (6)</SectionTitle>
      <div className="space-y-2">
        {pages.map((p, i) => (
          <button
            key={p.id}
            className={cn(
              'group flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors',
              i === 0 ? 'border-primary bg-primary/5' : 'hover:bg-accent/40'
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">
              {i + 1}
            </span>
            <GradientThumb id={p.thumb} className="h-12 w-16 shrink-0" />
            <span className="flex-1 truncate text-sm text-foreground">
              {p.title}
            </span>
          </button>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-3 w-full">
        <Plus className="mr-1 h-3.5 w-3.5" /> Add page
      </Button>
    </div>
  );
}

function TemplatesTab() {
  return (
    <div>
      <SectionTitle>Templates</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {templates.slice(0, 6).map((t) => (
          <button key={t.id} className="group text-left">
            <GradientThumb
              id={t.thumbnail}
              className="aspect-[4/3] w-full transition-transform group-hover:scale-[1.02]"
            />
            <p className="mt-1.5 truncate text-xs text-muted-foreground">
              {t.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function TextTab() {
  const items = [
    { icon: Heading1, label: 'Heading' },
    { icon: Heading2, label: 'Subheading' },
    { icon: Type, label: 'Body text' },
  ];
  return (
    <div>
      <SectionTitle>Add text</SectionTitle>
      <div className="space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.label}
              className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-accent/30"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ImagesTab() {
  return (
    <div>
      <SectionTitle>Stock images</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4'].map((g) => (
          <button key={g}>
            <GradientThumb id={g} className="aspect-[4/3] w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

function IconsTab() {
  const shapes = [
    { icon: Square, label: 'Square' },
    { icon: Circle, label: 'Circle' },
    { icon: Triangle, label: 'Triangle' },
  ];
  return (
    <div>
      <SectionTitle>Shapes & icons</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              className="flex aspect-square items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChartsTab() {
  const charts = ['Bar', 'Line', 'Pie', 'Area', 'Donut', 'Stacked'];
  return (
    <div>
      <SectionTitle>Charts</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {charts.map((c) => (
          <button
            key={c}
            className="rounded-lg border bg-card p-3 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-accent/30 hover:text-foreground"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function TablesTab() {
  return (
    <div>
      <SectionTitle>Tables</SectionTitle>
      <div className="space-y-2">
        {['Basic table', 'Pricing table', 'Comparison matrix', 'Data grid'].map(
          (t) => (
            <button
              key={t}
              className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-accent/30"
            >
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              {t}
            </button>
          )
        )}
      </div>
    </div>
  );
}

function UploadsTab() {
  return (
    <div>
      <SectionTitle>Your uploads</SectionTitle>
      <div className="rounded-xl border border-dashed p-8 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium text-foreground">
          Drag files here
        </p>
        <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 10MB</p>
        <Button variant="outline" size="sm" className="mt-3">
          Browse files
        </Button>
      </div>
    </div>
  );
}

function BrandTab() {
  return (
    <div>
      <SectionTitle>Brand Kit</SectionTitle>
      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">Helio Labs</p>
        <div className="mt-3 flex gap-2">
          {['#2563EB', '#7C3AED', '#0EA5E9'].map((c) => (
            <span
              key={c}
              className="h-8 w-8 rounded-lg border"
              style={{ background: c }}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Fonts: Plus Jakarta Sans, Inter
        </p>
        <Button variant="outline" size="sm" className="mt-3 w-full">
          Apply brand kit
        </Button>
      </div>
    </div>
  );
}
