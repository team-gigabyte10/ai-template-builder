'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';

export function Footer() {
  const { t } = useAppStore();
  const columns = [
    {
      title: t('footer.product'),
      links: [
        { label: t('nav.features'), href: '/features' },
        { label: t('nav.pricing'), href: '/#pricing' },
        { label: 'Templates', href: '/dashboard/templates' },
        { label: 'Marketplace', href: '/dashboard/marketplace' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Community', href: '#' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Status', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Logo size="sm" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <LanguageToggle className="ml-1" />
              <ThemeToggle />
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>{t('footer.rights')}</p>
          <p>{t('footer.built')}</p>
        </div>
      </div>
    </footer>
  );
}
