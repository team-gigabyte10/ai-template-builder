'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/store/use-app-store';

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const { t } = useAppStore();
  const links = [
    { label: t('nav.features'), href: '/features' },
    { label: t('nav.workflow'), href: '/#workflow' },
    { label: t('nav.pricing'), href: '/#pricing' },
    { label: t('nav.faq'), href: '/#faq' },
  ];
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mt-4 flex h-14 items-center justify-between rounded-2xl border bg-background/70 px-4 shadow-soft backdrop-blur-xl lg:px-6">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:flex" />
            <ThemeToggle className="hidden sm:flex" />
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/login">{t('nav.signin')}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">{t('nav.startFree')}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl border bg-background/90 p-4 shadow-soft backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {t('nav.signin')}
              </Link>
            </nav>
            <div className="mt-3 flex items-center gap-2 border-t pt-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
