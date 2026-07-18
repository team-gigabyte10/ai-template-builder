'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useAppStore } from '@/store/use-app-store';
import { sidebarNav } from '@/components/shared/nav-config';
import { docTypes, recentDocuments } from '@/lib/mock-data';
import { docTypeLabel } from '@/lib/mock-data';
import { FileText, Sparkles, Search, ArrowRight } from 'lucide-react';

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useAppStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandOpen, setCommandOpen]);

  if (!mounted) return null;

  const go = (href: string) => {
    setCommandOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search documents, templates, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {sidebarNav.map((n) => {
            const Icon = n.icon;
            return (
              <CommandItem
                key={n.href}
                onSelect={() => go(n.href)}
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                {n.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Create with AI">
          {docTypes.slice(0, 5).map((d) => (
            <CommandItem
              key={d.id}
              onSelect={() => go('/dashboard/generator')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Generate {d.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recent Documents">
          {recentDocuments.slice(0, 5).map((d) => (
            <CommandItem
              key={d.id}
              onSelect={() => go(`/dashboard/editor/${d.id}`)}
              className="gap-2"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{d.title}</span>
              <span className="text-xs text-muted-foreground">
                {docTypeLabel[d.type]}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => go('/dashboard/marketplace')}>
            <Search className="h-4 w-4" /> Browse marketplace
          </CommandItem>
          <CommandItem onSelect={() => go('/dashboard/billing')}>
            <ArrowRight className="h-4 w-4" /> Upgrade plan
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
