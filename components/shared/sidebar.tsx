'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ChevronLeft, X } from 'lucide-react';
import { sidebarNav } from '@/components/shared/nav-config';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { user } = useAppStore();
  const creditPct = Math.round((user.credits / user.maxCredits) * 100);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card/80 backdrop-blur-xl transition-all duration-300 lg:static lg:z-auto',
          collapsed ? 'w-[72px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {collapsed ? (
            <Logo showText={false} size="sm" />
          ) : (
            <Logo size="sm" />
          )}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-8 w-8"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft
                className={cn(
                  'h-4 w-4 transition-transform',
                  collapsed && 'rotate-180'
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {sidebarNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/dashboard' &&
                  pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon
                    className={cn(
                      'relative h-4 w-4 shrink-0',
                      active && 'text-primary'
                    )}
                  />
                  {!collapsed && <span className="relative">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="relative ml-auto rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs shadow-md group-hover:block">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {!collapsed && (
          <div className="border-t p-3">
            <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-accent/10 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI Credits
              </div>
              <Progress value={creditPct} className="h-1.5" />
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{user.credits.toLocaleString()}</span>
                <span>{user.maxCredits.toLocaleString()}</span>
              </div>
              <Button
                asChild
                size="sm"
                className="mt-3 h-7 w-full text-xs"
              >
                <Link href="/dashboard/billing">Upgrade</Link>
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[11px] text-muted-foreground">
                {user.plan} plan
              </span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
