'use client';

import { useState } from 'react';
import { Upload, Check, Palette, Type } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/components/shared/page-header';
import { useAppStore } from '@/store/use-app-store';
import { toast } from 'sonner';

const swatches = [
  '#2563EB', '#7C3AED', '#0EA5E9', '#059669', '#EAB308',
  '#F97316', '#E11D48', '#64748B', '#0F172A', '#EC4899',
];

const fonts = ['Plus Jakarta Sans', 'Inter', 'Roboto', 'Poppins', 'Manrope'];

export default function BrandKitPage() {
  const { brandKit, updateBrandKit } = useAppStore();
  const [local, setLocal] = useState(brandKit);

  const save = () => {
    updateBrandKit(local);
    toast.success('Brand kit saved');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand Kit"
        description="Apply your brand across every document automatically."
        actions={
          <Button onClick={save}>
            <Check className="mr-2 h-4 w-4" /> Save changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Brand identity</CardTitle>
            <CardDescription>Logo, colors, and fonts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Company name</Label>
              <Input
                value={local.companyName}
                onChange={(e) => setLocal({ ...local, companyName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed bg-muted/40">
                  {local.logoUrl ? (
                    <img src={local.logoUrl} alt="Logo" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Button variant="outline" size="sm">Upload logo</Button>
                  <p className="mt-1.5 text-xs text-muted-foreground">PNG or SVG, up to 2MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <ColorPicker
                label="Primary"
                value={local.primaryColor}
                onChange={(c) => setLocal({ ...local, primaryColor: c })}
              />
              <ColorPicker
                label="Secondary"
                value={local.secondaryColor}
                onChange={(c) => setLocal({ ...local, secondaryColor: c })}
              />
              <ColorPicker
                label="Accent"
                value={local.accentColor}
                onChange={(c) => setLocal({ ...local, accentColor: c })}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Heading font</Label>
                <Select
                  value={local.fonts.heading}
                  onValueChange={(v) => setLocal({ ...local, fonts: { ...local.fonts, heading: v } })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Body font</Label>
                <Select
                  value={local.fonts.body}
                  onValueChange={(v) => setLocal({ ...local, fonts: { ...local.fonts, body: v } })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Theme preview</CardTitle>
            <CardDescription>How your brand looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="overflow-hidden rounded-xl border shadow-soft"
              style={{ background: `linear-gradient(135deg, ${local.primaryColor}, ${local.secondaryColor})` }}
            >
              <div className="p-5 text-white">
                <p className="text-xs uppercase tracking-wide opacity-80">
                  {local.companyName}
                </p>
                <p
                  className="mt-2 text-2xl font-bold"
                  style={{ fontFamily: local.fonts.heading }}
                >
                  Your headline here
                </p>
                <p
                  className="mt-1 text-sm opacity-80"
                  style={{ fontFamily: local.fonts.body }}
                >
                  Body copy styled with your brand fonts and colors.
                </p>
                <button
                  className="mt-4 rounded-lg px-4 py-2 text-sm font-medium"
                  style={{ background: local.accentColor, color: 'white' }}
                >
                  Call to action
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {[local.primaryColor, local.secondaryColor, local.accentColor].map((c) => (
                <div key={c} className="flex-1">
                  <div className="h-12 rounded-lg border" style={{ background: c }} />
                  <p className="mt-1 text-center text-[10px] text-muted-foreground">{c}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded-md border bg-card"
        />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
      </div>
      <div className="flex flex-wrap gap-1">
        {swatches.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="h-5 w-5 rounded-md border transition-transform hover:scale-110"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}
