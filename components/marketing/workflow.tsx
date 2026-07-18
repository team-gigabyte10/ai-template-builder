'use client';

import { motion } from 'framer-motion';
import { Sparkles, Wand2, LayoutTemplate, Download } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';

export function Workflow() {
  const { t } = useAppStore();
  const steps = [
    { icon: Sparkles, title: t('workflow.step1.title'), desc: t('workflow.step1.desc'), color: 'from-blue-500 to-cyan-500' },
    { icon: Wand2, title: t('workflow.step2.title'), desc: t('workflow.step2.desc'), color: 'from-violet-500 to-purple-500' },
    { icon: LayoutTemplate, title: t('workflow.step3.title'), desc: t('workflow.step3.desc'), color: 'from-emerald-500 to-teal-500' },
    { icon: Download, title: t('workflow.step4.title'), desc: t('workflow.step4.desc'), color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section id="workflow" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 gradient-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('workflow.eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('workflow.title')}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-2xl border bg-card/80 p-6 shadow-soft backdrop-blur"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-muted-foreground/20">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border lg:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
