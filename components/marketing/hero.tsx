'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import { trustedCompanies } from '@/lib/mock-data';
import { Logo } from '@/components/shared/logo';
import { useAppStore } from '@/store/use-app-store';

export function Hero() {
  const { t } = useAppStore();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 text-center lg:px-8 lg:pb-24 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur"
        >
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
          </span>
          {t('hero.badge')}
          <ArrowRight className="h-3 w-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
        >
          {t('hero.title1')}{' '}
          <span className="gradient-text">{t('hero.title2') || 'with AI'}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild className="h-12 px-6 text-base shadow-glow">
            <Link href="/register">
              {t('hero.startFree')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 px-6 text-base"
          >
            <Link href="#demo">
              <Play className="mr-2 h-4 w-4" /> {t('hero.watchDemo')}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="ml-1.5 font-medium text-foreground">4.9/5</span>
          </span>
          <span>·</span>
          <span>{t('hero.noCard')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border bg-card/80 p-2 shadow-xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-xl border bg-background">
              <HeroPreview />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-x-20 -top-10 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
        </motion.div>

        <div className="mt-14">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t('hero.trusted')}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            {trustedCompanies.map((c) => (
              <span
                key={c}
                className="font-display text-lg font-semibold text-foreground/80"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-3 hidden border-r p-3 md:block">
        <div className="flex items-center gap-2">
          <Logo showText={false} size="sm" />
          <div className="h-2 w-20 rounded-full bg-muted" />
        </div>
        <div className="mt-4 space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-lg p-2 ${
                i === 1 ? 'bg-primary/10' : ''
              }`}
            >
              <div
                className={`h-6 w-6 rounded-md ${
                  i === 1 ? 'bg-primary/30' : 'bg-muted'
                }`}
              />
              <div className="h-2 w-16 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 rounded-full bg-muted" />
            <div className="h-5 w-20 rounded-md bg-primary/15" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-muted" />
            <div className="h-6 w-6 rounded-full bg-muted" />
            <div className="h-6 w-6 rounded-full bg-primary/20" />
          </div>
        </div>
        <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/10 via-accent/5 to-background p-6">
          <div className="grid h-full grid-cols-2 gap-4">
            <div className="flex flex-col justify-center">
              <div className="h-3 w-20 rounded-full bg-primary/30" />
              <div className="mt-3 h-7 w-3/4 rounded-lg bg-foreground/80" />
              <div className="mt-2 h-7 w-2/3 rounded-lg bg-foreground/60" />
              <div className="mt-4 h-2 w-full rounded-full bg-muted" />
              <div className="mt-2 h-2 w-5/6 rounded-full bg-muted" />
              <div className="mt-4 flex gap-2">
                <div className="h-8 w-24 rounded-lg bg-primary" />
                <div className="h-8 w-20 rounded-lg border" />
              </div>
            </div>
            <div className="relative hidden items-center justify-center sm:flex">
              <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-2xl" />
              <div className="relative grid h-32 w-32 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
                <Sparkles className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
