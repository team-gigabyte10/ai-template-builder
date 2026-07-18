import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Store,
  History,
  CreditCard,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const sidebarNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Documents', href: '/dashboard/documents', icon: FileText },
  { label: 'Templates', href: '/dashboard/templates', icon: LayoutTemplate },
  { label: 'AI Generator', href: '/dashboard/generator', icon: Sparkles, badge: 'AI' },
  { label: 'Assets', href: '/dashboard/assets', icon: ImageIcon },
  { label: 'Brand Kit', href: '/dashboard/brand-kit', icon: Palette },
  { label: 'Marketplace', href: '/dashboard/marketplace', icon: Store },
  { label: 'History', href: '/dashboard/history', icon: History },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];
