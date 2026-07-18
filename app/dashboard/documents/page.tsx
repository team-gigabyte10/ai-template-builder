'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Grid2x2,
  List,
  Star,
  Share2,
  Copy,
  Trash2,
  MoreHorizontal,
  Clock,
  Plus,
  Filter,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageHeader } from '@/components/shared/page-header';
import { GradientThumb } from '@/components/shared/gradient-thumb';
import { recentDocuments } from '@/lib/mock-data';
import { docTypeLabel } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'list';
type SortKey = 'updated' | 'created' | 'title';

export default function DocumentsPage() {
  const [view, setView] = useState<ViewMode>('grid');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('updated');
  const [type, setType] = useState<string>('all');

  const filtered = recentDocuments
    .filter((d) => {
      const matchQuery =
        !query || d.title.toLowerCase().includes(query.toLowerCase());
      const matchType = type === 'all' || d.type === type;
      return matchQuery && matchType;
    })
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'created')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Documents"
        description="All your documents in one place."
        actions={
          <Button asChild>
            <Link href="/dashboard/generator">
              <Plus className="mr-2 h-4 w-4" /> New Document
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents…"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-1 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {Object.entries(docTypeLabel).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="created">Date created</SelectItem>
              <SelectItem value="title">Title (A–Z)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center rounded-md border">
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setView('grid')}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-glow">
                <Link href={`/dashboard/editor/${doc.id}`}>
                  <GradientThumb
                    id={doc.thumbnail}
                    className="aspect-[4/3] w-full"
                  />
                </Link>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/dashboard/editor/${doc.id}`} className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground hover:text-primary">
                        {doc.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {docTypeLabel[doc.type]} · {doc.pages} pages
                      </p>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success('Document opened')}>
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success('Duplicated')}>
                          <Copy className="mr-2 h-3.5 w-3.5" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success('Share link copied')}>
                          <Share2 className="mr-2 h-3.5 w-3.5" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.success('Document deleted')}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(doc.updatedAt).toLocaleDateString('en', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {doc.starred && <Star className="h-3.5 w-3.5 fill-warning text-warning" />}
                      {doc.shared && <Share2 className="h-3.5 w-3.5" />}
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] uppercase',
                          doc.status === 'published'
                            ? 'border-success/30 text-success'
                            : doc.status === 'draft'
                              ? 'border-muted-foreground/30 text-muted-foreground'
                              : 'border-destructive/30 text-destructive'
                        )}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-accent/30"
                >
                  <GradientThumb id={doc.thumbnail} className="h-12 w-16 shrink-0" />
                  <Link href={`/dashboard/editor/${doc.id}`} className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground hover:text-primary">
                      {doc.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {docTypeLabel[doc.type]} · {doc.pages} pages
                    </p>
                  </Link>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {new Date(doc.updatedAt).toLocaleDateString('en', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {doc.starred && <Star className="h-3.5 w-3.5 fill-warning text-warning" />}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success('Duplicated')}>
                          <Copy className="mr-2 h-3.5 w-3.5" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success('Share link copied')}>
                          <Share2 className="mr-2 h-3.5 w-3.5" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.success('Document deleted')}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
