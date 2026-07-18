'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { planTiers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useAppStore, formatCurrency } from '@/store/use-app-store';

export function Pricing() {
  const { t, locale } = useAppStore();
  return (
    <section id="pricing" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('pricing.eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('pricing.subtitle')}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {planTiers.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-6 shadow-soft',
                plan.popular && 'border-primary/40 shadow-glow'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-white shadow-glow">
                  {t('pricing.popular')}
                </div>
              )}
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                {plan.current && (
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {t('pricing.current')}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price === 0
                    ? formatCurrency(0, locale)
                    : formatCurrency(plan.price, locale)}
                </span>
                <span className="mb-1 text-sm text-muted-foreground">
                  /{plan.period === 'forever' ? t('pricing.forever') : t('pricing.month')}
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex-1" />
              <Button
                asChild
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full"
              >
                <Link href="/register">
                  {plan.id === 'pro' ? (
                    <>
                      <Sparkles className="mr-1 h-4 w-4" /> {plan.cta}
                    </>
                  ) : (
                    plan.cta
                  )}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
