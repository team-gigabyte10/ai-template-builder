'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';

export function AuthLayout({
  children,
  title,
  subtitle,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-accent p-10 text-white lg:flex">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <Link href="/">
            <Logo className="[&_span]:text-white" />
          </Link>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="h-10 w-10 text-white/40" />
            <p className="mt-4 max-w-md font-display text-2xl font-medium leading-snug text-white">
              "DocumentOS replaced three tools for our team. The AI generator
              produces decks that genuinely impress our clients."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Sofia"
                className="h-11 w-11 rounded-full border-2 border-white/30 object-cover"
              />
              <div>
                <div className="text-sm font-semibold">Sofia Reyes</div>
                <div className="text-xs text-white/70">
                  Head of Design, Lumina
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="relative flex items-center gap-2 text-sm text-white/70">
          <Sparkles className="h-4 w-4" />
          Trusted by 50,000+ professionals worldwide
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col bg-background">
        <div className="flex items-center justify-between p-4 lg:hidden">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <ThemeToggle />
        </div>
        <div className="hidden justify-end p-4 lg:flex">
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
            {footer && <div className="mt-6 text-center">{footer}</div>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
