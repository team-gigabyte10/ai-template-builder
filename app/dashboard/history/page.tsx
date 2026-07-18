'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText, Download, Trash2, Edit, Share2, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { cn } from '@/lib/utils';

const history = [
  { id: 'h1', action: 'Generated document', detail: 'Q4 Investor Pitch Deck', icon: Sparkles, time: '2 hours ago', type: 'ai' },
  { id: 'h2', action: 'Edited document', detail: 'Senior Product Designer CV', icon: Edit, time: '5 hours ago', type: 'edit' },
  { id: 'h3', action: 'Exported document', detail: 'Annual Sustainability Report', icon: Download, time: '1 day ago', type: 'export' },
  { id: 'h4', action: 'Shared document', detail: 'Acme Corp — Software Proposal', icon: Share2, time: '2 days ago', type: 'share' },
  { id: 'h5', action: 'Created document', detail: 'Helio — 2026 Business Plan', icon: Plus, time: '3 days ago', type: 'create' },
  { id: 'h6', action: 'Generated document', detail: 'Consulting Invoice #1042', icon: Sparkles, time: '4 days ago', type: 'ai' },
  { id: 'h7', action: 'Deleted document', detail: 'Old Draft — Marketing Plan', icon: Trash2, time: '5 days ago', type: 'delete' },
  { id: 'h8', action: 'Edited document', detail: 'Neural Networks — Research Paper', icon: Edit, time: '6 days ago', type: 'edit' },
];

const toneMap: Record<string, string> = {
  ai: 'bg-primary/10 text-primary',
  edit: 'bg-accent/10 text-accent',
  export: 'bg-success/10 text-success',
  share: 'bg-warning/10 text-warning',
  create: 'bg-blue-500/10 text-blue-500',
  delete: 'bg-destructive/10 text-destructive',
};

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="History" description="Your recent activity across all documents." />
      <Card>
        <CardContent className="p-0">
          <div className="relative pl-8">
            <div className="absolute left-4 top-6 bottom-6 w-px bg-border" />
            <div className="divide-y">
              {history.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 p-4"
                  >
                    <div className={cn('relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background', toneMap[h.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{h.action}</p>
                      <p className="text-xs text-muted-foreground">{h.detail}</p>
                    </div>
                    <Badge variant="outline" className="text-xs text-muted-foreground">{h.time}</Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
