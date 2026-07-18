'use client';

import { motion } from 'framer-motion';
import { Check, CreditCard, Download, Sparkles, HardDrive, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { planTiers, invoices } from '@/lib/mock-data';
import { useAppStore, formatCurrency } from '@/store/use-app-store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function BillingPage() {
  const { user, locale, t } = useAppStore();
  const creditPct = Math.round((user.credits / user.maxCredits) * 100);
  const storagePct = Math.round((user.storage / user.maxStorage) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Billing"
        description="Manage your plan, usage, and payment methods."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Current Plan" value={user.plan} icon={CreditCard} tone="primary" index={0} />
        <StatCard label="AI Credits" value={`${user.credits.toLocaleString()}`} delta={`of ${user.maxCredits.toLocaleString()}`} icon={Sparkles} tone="accent" index={1} />
        <StatCard label="Storage" value={`${user.storage} GB`} delta={`of ${user.maxStorage} GB`} icon={HardDrive} tone="success" index={2} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage this month</CardTitle>
          <CardDescription>Resets on August 1, 2026</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> AI Credits
              </span>
              <span className="font-medium">{user.credits.toLocaleString()} / {user.maxCredits.toLocaleString()}</span>
            </div>
            <Progress value={creditPct} className="h-2" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <HardDrive className="h-4 w-4 text-success" /> Storage
              </span>
              <span className="font-medium">{user.storage} / {user.maxStorage} GB</span>
            </div>
            <Progress value={storagePct} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
          Plans
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {planTiers.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-6 shadow-soft',
                plan.popular && 'border-primary/40 shadow-glow'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-3xl font-bold">{formatCurrency(plan.price, locale)}</span>
                <span className="mb-1 text-sm text-muted-foreground">/{plan.period === 'forever' ? t('pricing.forever') : t('pricing.month')}</span>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1" />
              <Button
                variant={plan.current ? 'outline' : plan.popular ? 'default' : 'outline'}
                className="w-full"
                disabled={plan.current}
                onClick={() => toast.success(`Switched to ${plan.name} plan`)}
              >
                {plan.current ? 'Current plan' : plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment method</CardTitle>
            <CardDescription>Your default card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-xl border bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm font-medium">•••• •••• •••• 4242</span>
                </div>
                <p className="mt-2 text-xs text-white/70">Expires 09/28 · Visa</p>
              </div>
              <Badge className="bg-white/20 text-white">Default</Badge>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => toast.info('Add payment method')}>
              Add payment method
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoices</CardTitle>
            <CardDescription>Download past invoices</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="text-sm">{new Date(inv.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.description}</TableCell>
                    <TableCell className="text-sm font-medium">{formatCurrency(inv.amount, locale)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          inv.status === 'paid' && 'border-success/30 text-success',
                          inv.status === 'pending' && 'border-warning/30 text-warning',
                          inv.status === 'failed' && 'border-destructive/30 text-destructive'
                        )}
                      >
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast.success('Invoice downloaded')}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
