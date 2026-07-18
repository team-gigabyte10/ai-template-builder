'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/shared/sidebar';
import { Topbar } from '@/components/shared/topbar';
import { CommandPalette } from '@/components/shared/command-palette';
import { useAppStore } from '@/store/use-app-store';
import { motion } from 'framer-motion';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCommandOpen } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          onMobileMenu={() => setMobileOpen(true)}
          onCommand={() => setCommandOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
