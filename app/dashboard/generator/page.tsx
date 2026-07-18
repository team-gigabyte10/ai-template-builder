'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  ArrowRight,
  Presentation,
  FileUser,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  Award,
  GraduationCap,
  type LucideIcon,
  Loader2,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/page-header';
import { docTypes, examplePrompts, aiSuggestions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const iconMap: Record<string, LucideIcon> = {
  Presentation,
  FileUser,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  Award,
  GraduationCap,
};

export default function GeneratorPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [selected, setSelected] = useState<string>('presentation');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    if (!prompt.trim()) {
      toast.error('Describe what you want to create');
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success('Document generated successfully');
      router.push('/dashboard/editor/new');
    }, 1600);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Generator"
        description="Describe what you want to create and let AI do the rest."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg opacity-40" />
                <div className="relative p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">
                        AI Document Generator
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Powered by DocumentOS AI
                      </p>
                    </div>
                  </div>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What would you like to create? e.g. A 10-slide pitch deck for an AI fitness app targeting Series A investors…"
                    className="min-h-[160px] resize-none border-0 bg-background/60 text-base shadow-soft backdrop-blur focus-visible:ring-1"
                  />
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      {prompt.length} characters · ~{Math.max(1, Math.ceil(prompt.length / 200))} pages
                    </p>
                    <Button onClick={generate} disabled={generating} size="lg" className="shadow-glow">
                      {generating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" /> Generate Document
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">
              Choose a document type
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {docTypes.map((d) => {
                const Icon = iconMap[d.icon] ?? FileText;
                const active = selected === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={cn(
                      'group relative overflow-hidden rounded-xl border p-3 text-left transition-all',
                      active
                        ? 'border-primary bg-primary/5 shadow-glow'
                        : 'bg-card hover:border-primary/30 hover:bg-accent/30'
                    )}
                  >
                    <div
                      className={cn(
                        'mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-soft',
                        d.gradient
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">
                      {d.label}
                    </p>
                    {active && (
                      <motion.div
                        layoutId="gen-active"
                        className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Lightbulb className="h-4 w-4 text-warning" /> Example prompts
            </p>
            <div className="space-y-2">
              {examplePrompts.map((p, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setPrompt(p)}
                  className="group flex w-full items-start gap-3 rounded-xl border bg-card p-3 text-left transition-all hover:border-primary/30 hover:bg-accent/30"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">
                    {p}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <p className="mb-3 text-sm font-semibold text-foreground">
                AI Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="cursor-pointer bg-card px-2.5 py-1 text-xs hover:border-primary hover:bg-primary/5"
                    onClick={() => setPrompt((p) => `${p} ${s}`.trim())}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="mb-4 text-sm font-semibold text-foreground">
                Generation settings
              </p>
              <div className="space-y-4">
                <SettingRow label="Tone" value="Professional" />
                <SettingRow label="Length" value="Standard" />
                <SettingRow label="Language" value="English" />
                <SettingRow label="Brand Kit" value="Helio Labs" />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 gradient-bg opacity-50" />
              <CardContent className="relative p-5">
                <p className="text-sm font-semibold text-foreground">
                  Tips for better results
                </p>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <li>• Specify your audience and goal</li>
                  <li>• Mention tone, length, and key sections</li>
                  <li>• Reference data or stats to include</li>
                  <li>• Use your Brand Kit for consistent design</li>
                </ul>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="relative mx-auto h-20 w-20">
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-primary to-accent opacity-30 blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
                  <Sparkles className="h-10 w-10 animate-pulse" />
                </div>
              </div>
              <p className="mt-6 font-display text-lg font-semibold text-foreground">
                Generating your document…
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                AI is drafting structure, copy, and design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
