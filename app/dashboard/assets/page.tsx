'use client';

import { Upload, MoreHorizontal, Trash2, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { GradientThumb } from '@/components/shared/gradient-thumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const assets = [
  { id: 'a1', name: 'hero-banner.png', type: 'Image', size: '2.4 MB', thumb: 'gradient-1' },
  { id: 'a2', name: 'logo-mark.svg', type: 'Vector', size: '12 KB', thumb: 'gradient-2' },
  { id: 'a3', name: 'team-photo.jpg', type: 'Image', size: '1.8 MB', thumb: 'gradient-3' },
  { id: 'a4', name: 'chart-data.csv', type: 'Data', size: '340 KB', thumb: 'gradient-4' },
  { id: 'a5', name: 'product-shot.png', type: 'Image', size: '3.1 MB', thumb: 'gradient-5' },
  { id: 'a6', name: 'icon-set.svg', type: 'Vector', size: '88 KB', thumb: 'gradient-6' },
  { id: 'a7', name: 'background.jpg', type: 'Image', size: '1.2 MB', thumb: 'gradient-7' },
  { id: 'a8', name: 'report-cover.png', type: 'Image', size: '2.0 MB', thumb: 'gradient-8' },
];

export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assets"
        description="Your uploaded images, icons, and files."
        actions={
          <Button onClick={() => toast.info('Upload files')}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        }
      />

      <div className="rounded-xl border border-dashed bg-card/40 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">
          Drag and drop files here
        </p>
        <p className="text-xs text-muted-foreground">PNG, JPG, SVG, CSV up to 10MB</p>
        <Button variant="outline" size="sm" className="mt-4">Browse files</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {assets.map((a) => (
          <Card key={a.id} className="group overflow-hidden transition-all hover:shadow-soft">
            <div className="relative">
              <GradientThumb id={a.thumb} className="aspect-square w-full" />
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80 backdrop-blur">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast.success('Downloaded')}>
                      <Download className="mr-2 h-3.5 w-3.5" /> Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => toast.success('Deleted')}>
                      <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="truncate text-sm font-medium text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.type} · {a.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
