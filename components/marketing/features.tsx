'use client';

import { motion } from 'framer-motion';
import {
  Presentation,
  FileUser,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  Award,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { docTypes } from '@/lib/mock-data';
import { useAppStore } from '@/store/use-app-store';

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

export function Features() {
  const { t } = useAppStore();
  return (
    <section id="features" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('features.eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('features.subtitle')}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {docTypes.map((d, i) => {
            const Icon = iconMap[d.icon] ?? FileText;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${d.gradient} text-white shadow-soft`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {d.label}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {d.description}
                </p>
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${d.gradient} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
