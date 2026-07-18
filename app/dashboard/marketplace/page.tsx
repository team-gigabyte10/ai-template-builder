'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  Download,
  Heart,
  Crown,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/page-header';
import { GradientThumb } from '@/components/shared/gradient-thumb';
import { templates, templateCategories } from '@/lib/mock-data';
import { docTypeLabel } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function MarketplacePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['t1']));
  const [used, setUsed] = useState<Set<string>>(new Set());

  const filtered = templates.filter((t) => {
    const matchCat = category === 'All' || t.category === category;
    const matchQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.author.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const useTemplate = (id: string) => {
    setUsed((prev) => new Set(prev).add(id));
    toast.success('Template added to your library');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Template Marketplace"
        description="Start from a professionally designed template."
        actions={
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        }
      />

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates by name or author…"
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {templateCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              category === c
                ? 'bg-primary text-primary-foreground shadow-glow'
                : 'border bg-card text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="relative">
                <GradientThumb
                  id={t.thumbnail}
                  className="aspect-[4/3] w-full"
                />
                <button
                  onClick={() => toggleFav(t.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
                  aria-label="Favorite"
                >
                  <Heart
                    className={cn(
                      'h-4 w-4',
                      favorites.has(t.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-muted-foreground'
                    )}
                  />
                </button>
                {t.pro && (
                  <Badge className="absolute left-3 top-3 gap-1 bg-amber-500/90 text-white">
                    <Crown className="h-3 w-3" /> Pro
                  </Badge>
                )}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 transition-transform group-hover:translate-y-0">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => useTemplate(t.id)}
                  >
                    {used.has(t.id) ? (
                      <>
                        <Check className="mr-1 h-3.5 w-3.5" /> Added
                      </>
                    ) : (
                      'Use Template'
                    )}
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {docTypeLabel[t.type]} · {t.author}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    {t.rating}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {(t.downloads / 1000).toFixed(1)}k
                  </span>
                  <div className="flex gap-1">
                    {t.colors.map((c) => (
                      <span
                        key={c}
                        className="h-3 w-3 rounded-full border"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
