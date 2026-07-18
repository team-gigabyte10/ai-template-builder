'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import {
  Sparkles,
  MousePointer2,
  Bot,
  Palette,
  Store,
  Users,
  Download,
  type LucideIcon,
} from 'lucide-react';
import { MarketingNav } from '@/components/marketing/nav';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/use-app-store';
import { CtaBanner } from '@/components/marketing/cta-banner';

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  gradient: string;
}

const features: Feature[] = [
  { icon: Sparkles, titleKey: 'featuresPage.ai.title', descKey: 'featuresPage.ai.desc', gradient: 'from-blue-500 to-cyan-500' },
  { icon: MousePointer2, titleKey: 'featuresPage.editor.title', descKey: 'featuresPage.editor.desc', gradient: 'from-violet-500 to-purple-500' },
  { icon: Bot, titleKey: 'featuresPage.assistant.title', descKey: 'featuresPage.assistant.desc', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Palette, titleKey: 'featuresPage.brand.title', descKey: 'featuresPage.brand.desc', gradient: 'from-rose-500 to-pink-500' },
  { icon: Store, titleKey: 'featuresPage.templates.title', descKey: 'featuresPage.templates.desc', gradient: 'from-amber-500 to-orange-500' },
  { icon: Users, titleKey: 'featuresPage.collab.title', descKey: 'featuresPage.collab.desc', gradient: 'from-indigo-500 to-blue-500' },
  { icon: Download, titleKey: 'featuresPage.export.title', descKey: 'featuresPage.export.desc', gradient: 'from-sky-500 to-indigo-500' },
];

export default function FeaturesPage() {
  const { t } = useAppStore();

  return (
    <div className="relative min-h-screen bg-background">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute inset-0 grid-pattern opacity-60" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('common.back')}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t('nav.features')}
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
                {t('featuresPage.title')}
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {t('featuresPage.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.titleKey}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-soft`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t(f.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(f.descKey)}
                    </p>
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-12 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-accent p-10 text-center shadow-glow lg:p-14"
            >
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                  {t('featuresPage.ctaTitle')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  {t('featuresPage.ctaSubtitle')}
                </p>
                <div className="mt-8">
                  <Button
                    size="lg"
                    asChild
                    className="h-12 bg-white px-6 text-base text-primary hover:bg-white/90"
                  >
                    <Link href="/register">
                      {t('featuresPage.ctaButton')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
