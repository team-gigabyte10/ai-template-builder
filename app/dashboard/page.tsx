'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Sparkles,
  HardDrive,
  TrendingUp,
  Plus,
  Clock,
  Star,
  Share2,
  ArrowRight,
  Presentation,
  FileUser,
  Briefcase,
  FileCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/stat-card';
import { PageHeader } from '@/components/shared/page-header';
import { GradientThumb } from '@/components/shared/gradient-thumb';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import {
  recentDocuments,
  monthlyActivity,
  storageBreakdown,
  docTypes,
} from '@/lib/mock-data';
import { docTypeLabel } from '@/lib/mock-data';
import { useAppStore } from '@/store/use-app-store';

const quickActions: { label: string; icon: LucideIcon; href: string; color: string }[] = [
  { label: 'Presentation', icon: Presentation, href: '/dashboard/generator', color: 'from-blue-500 to-cyan-500' },
  { label: 'Resume', icon: FileUser, href: '/dashboard/generator', color: 'from-emerald-500 to-teal-500' },
  { label: 'Report', icon: FileText, href: '/dashboard/generator', color: 'from-amber-500 to-orange-500' },
  { label: 'Proposal', icon: FileCheck, href: '/dashboard/generator', color: 'from-rose-500 to-pink-500' },
  { label: 'Business Plan', icon: Briefcase, href: '/dashboard/generator', color: 'from-indigo-500 to-blue-500' },
];

const activityChartConfig = {
  documents: { label: 'Documents', color: 'hsl(var(--chart-1))' },
  ai: { label: 'AI Usage', color: 'hsl(var(--chart-2))' },
};
const storageChartConfig = {
  value: { label: 'Storage', color: 'hsl(var(--chart-1))' },
};

export default function DashboardPage() {
  const { user } = useAppStore();
  const creditPct = Math.round((user.credits / user.maxCredits) * 100);
  const storagePct = Math.round((user.storage / user.maxStorage) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name.split(' ')[0]}`}
        description="Here's what's happening with your documents today."
        actions={
          <Button asChild>
            <Link href="/dashboard/generator">
              <Plus className="mr-2 h-4 w-4" /> New Document
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Documents Created"
          value="142"
          delta="+12 this month"
          icon={FileText}
          tone="primary"
          index={0}
        />
        <StatCard
          label="AI Credits Used"
          value="760"
          delta="of 2,000"
          icon={Sparkles}
          tone="accent"
          index={1}
        />
        <StatCard
          label="Storage Used"
          value={`${user.storage} GB`}
          delta={`${user.maxStorage} GB total`}
          icon={HardDrive}
          tone="success"
          index={2}
        />
        <StatCard
          label="Monthly Activity"
          value="+26"
          delta="+18% vs last month"
          icon={TrendingUp}
          tone="warning"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Document & AI Activity</CardTitle>
            <CardDescription>Last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={activityChartConfig}
              className="h-[260px] w-full"
            >
              <AreaChart data={monthlyActivity} margin={{ left: -16, right: 8 }}>
                <defs>
                  <linearGradient id="fillDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="documents"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#fillDocs)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stroke="hsl(var(--chart-2))"
                  fill="url(#fillAi)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Storage Breakdown</CardTitle>
            <CardDescription>{user.storage} GB of {user.maxStorage} GB</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={storageChartConfig} className="mx-auto h-[180px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                <Pie
                  data={storageBreakdown}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {storageBreakdown.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {storageBreakdown.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-medium">{s.value} GB</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Recent Documents</CardTitle>
              <CardDescription>Recently edited</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/documents">
                View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {recentDocuments.slice(0, 4).map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link
                    href={`/dashboard/editor/${doc.id}`}
                    className="group flex gap-3 rounded-xl border bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <GradientThumb
                      id={doc.thumbnail}
                      className="h-16 w-20 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {doc.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {docTypeLabel[doc.type]} · {doc.pages} pages
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(doc.updatedAt).toLocaleDateString('en', {
                          month: 'short',
                          day: 'numeric',
                        })}
                        {doc.starred && <Star className="h-3 w-3 fill-warning text-warning" />}
                        {doc.shared && <Share2 className="h-3 w-3" />}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Generate with AI</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="group flex items-center gap-3 rounded-lg border bg-card p-2.5 transition-all hover:border-primary/30 hover:bg-accent/30"
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${a.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {a.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage</CardTitle>
              <CardDescription>Plan resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Credits
                  </span>
                  <span className="font-medium">{user.credits.toLocaleString()}</span>
                </div>
                <Progress value={creditPct} className="h-1.5" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <HardDrive className="h-3.5 w-3.5 text-success" /> Storage
                  </span>
                  <span className="font-medium">{user.storage} / {user.maxStorage} GB</span>
                </div>
                <Progress value={storagePct} className="h-1.5" />
              </div>
              <Button asChild variant="outline" className="w-full" size="sm">
                <Link href="/dashboard/billing">Manage plan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
