'use client';

import { useState } from 'react';
import {
  Type,
  Palette,
  Square,
  Move,
  Maximize,
  Sparkles,
  Sun,
  Droplet,
  PaintBucket,
  AlignLeft,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64];
const colorSwatches = [
  '#2563EB', '#7C3AED', '#0EA5E9', '#059669', '#EAB308',
  '#F97316', '#E11D48', '#64748B', '#0F172A', '#FFFFFF',
];
const radiusOptions = [0, 4, 8, 12, 16, 24];

export function EditorRightPanel() {
  const [opacity, setOpacity] = useState(100);
  const [radius, setRadius] = useState(12);
  const [shadow, setShadow] = useState(20);
  const [spacing, setSpacing] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-3">
        <p className="text-sm font-semibold text-foreground">Properties</p>
        <p className="text-xs text-muted-foreground">Heading · &quot;Build the future&quot;</p>
      </div>
      <Tabs defaultValue="design" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="m-3 grid grid-cols-2">
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="arrange">Arrange</TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <div className="p-3 pt-0">
            <TabsContent value="design" className="mt-0 space-y-5">
              <PropertyGroup icon={Type} label="Typography">
                <div className="grid grid-cols-2 gap-2">
                  <SelectChip label="Jakarta Sans" />
                  <SelectChip label="Semibold" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {fontSizes.map((s) => (
                    <button
                      key={s}
                      className={cn(
                        'h-7 w-9 rounded-md border text-xs font-medium transition-colors',
                        s === 32
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </PropertyGroup>

              <PropertyGroup icon={Palette} label="Color">
                <div className="grid grid-cols-5 gap-2">
                  {colorSwatches.map((c) => (
                    <button
                      key={c}
                      className="h-7 w-7 rounded-lg border-2 transition-transform hover:scale-110"
                      style={{ background: c, borderColor: c === '#2563EB' ? '#2563EB' : 'transparent' }}
                    />
                  ))}
                </div>
              </PropertyGroup>

              <PropertyGroup icon={PaintBucket} label="Background">
                <div className="grid grid-cols-5 gap-2">
                  {colorSwatches.map((c) => (
                    <button
                      key={c}
                      className="h-7 w-7 rounded-lg border transition-transform hover:scale-110"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </PropertyGroup>

              <PropertyGroup icon={Sun} label="Opacity">
                <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} max={100} />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span className="font-medium text-foreground">{opacity}%</span>
                  <span>100%</span>
                </div>
              </PropertyGroup>

              <PropertyGroup icon={Square} label="Border radius">
                <div className="flex gap-1">
                  {radiusOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRadius(r)}
                      className={cn(
                        'flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors',
                        radius === r
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent'
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </PropertyGroup>

              <PropertyGroup icon={Droplet} label="Shadow">
                <Slider value={[shadow]} onValueChange={(v) => setShadow(v[0])} max={100} />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>None</span>
                  <span className="font-medium text-foreground">{shadow}</span>
                  <span>Strong</span>
                </div>
              </PropertyGroup>

              <PropertyGroup icon={AlignLeft} label="Spacing">
                <Slider value={[spacing]} onValueChange={(v) => setSpacing(v[0])} min={-20} max={80} />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{spacing}px</span>
                </div>
              </PropertyGroup>

              <PropertyGroup icon={Sparkles} label="Animation">
                <div className="grid grid-cols-2 gap-2">
                  {['Fade in', 'Slide up', 'Scale', 'Blur'].map((a, i) => (
                    <button
                      key={a}
                      className={cn(
                        'rounded-md border py-2 text-xs font-medium transition-colors',
                        i === 0
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent'
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </PropertyGroup>
            </TabsContent>

            <TabsContent value="arrange" className="mt-0 space-y-5">
              <PropertyGroup icon={Move} label="Position">
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="X" value={64} />
                  <NumberInput label="Y" value={56} />
                </div>
              </PropertyGroup>
              <PropertyGroup icon={Maximize} label="Size">
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="W" value={520} />
                  <NumberInput label="H" value={64} />
                </div>
              </PropertyGroup>
              <PropertyGroup icon={AlignLeft} label="Alignment">
                <div className="grid grid-cols-6 gap-1">
                  {['↖', '↑', '↗', '←', '→', '↔'].map((a) => (
                    <button
                      key={a}
                      className="flex h-8 items-center justify-center rounded-md border text-sm text-muted-foreground hover:bg-accent"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </PropertyGroup>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Bring to front
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Send to back
                </Button>
                <Button variant="outline" size="sm" className="w-full text-destructive">
                  Delete element
                </Button>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

function PropertyGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      {children}
    </div>
  );
}

function SelectChip({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-between rounded-md border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-accent">
      {label}
    </button>
  );
}

function NumberInput({ label, value }: { label: string; value: number }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <input
        defaultValue={value}
        className="h-8 w-full rounded-md border bg-card pl-7 pr-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  );
}
