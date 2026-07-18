'use client';

import Link from 'next/link';
import { Search, Bell, Menu, Plus, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { useAppStore } from '@/store/use-app-store';
import { usePathname } from 'next/navigation';
import { sidebarNav } from '@/components/shared/nav-config';

export function Topbar({
  onMobileMenu,
  onCommand,
}: {
  onMobileMenu: () => void;
  onCommand: () => void;
}) {
  const { user } = useAppStore();
  const pathname = usePathname();
  const current = sidebarNav.find(
    (n) => pathname === n.href || (n.href !== '/dashboard' && pathname.startsWith(n.href))
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMobileMenu}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden md:block">
        <h1 className="font-display text-lg font-semibold text-foreground">
          {current?.label ?? 'Dashboard'}
        </h1>
      </div>

      <button
        onClick={onCommand}
        className="group ml-auto flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:max-w-sm"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search documents…</span>
        <kbd className="hidden items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        <Button asChild size="sm" className="hidden sm:flex">
          <Link href="/dashboard/generator">
            <Plus className="mr-1 h-4 w-4" /> New
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>
        <LanguageToggle className="hidden sm:flex" />
        <ThemeToggle className="hidden sm:flex" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/brand-kit">Brand Kit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
