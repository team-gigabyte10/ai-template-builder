'use client';

import { useState } from 'react';
import { User, Building2, Bell, Key, Shield, Palette, Globe, AlertTriangle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/components/shared/page-header';
import { useAppStore } from '@/store/use-app-store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

export default function SettingsPage() {
  const { user } = useAppStore();
  const [active, setActive] = useState('profile');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and workspace." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <nav className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="lg:col-span-3">
          {active === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change avatar</Button>
                    <p className="mt-1.5 text-xs text-muted-foreground">JPG or PNG, up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full name</Label>
                    <Input defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={user.email} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input placeholder="Tell us about yourself" />
                </div>
                <Button onClick={() => toast.success('Profile saved')}>
                  <Check className="mr-2 h-4 w-4" /> Save changes
                </Button>
              </CardContent>
            </Card>
          )}

          {active === 'workspace' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workspace</CardTitle>
                <CardDescription>Manage your team workspace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Workspace name</Label>
                  <Input defaultValue="Helio Labs" />
                </div>
                <div className="space-y-2">
                  <Label>Workspace URL</Label>
                  <Input defaultValue="documentos.ai/helio-labs" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Team members</p>
                    <p className="text-xs text-muted-foreground">5 of 10 seats used</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info('Invite members')}>Invite</Button>
                </div>
                <Button onClick={() => toast.success('Workspace saved')}>
                  <Check className="mr-2 h-4 w-4" /> Save
                </Button>
              </CardContent>
            </Card>
          )}

          {active === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notifications</CardTitle>
                <CardDescription>Choose what you hear about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { label: 'Document shared with you', desc: 'Get notified when someone shares a document', on: true },
                  { label: 'AI generation complete', desc: 'Notify when a generation finishes', on: true },
                  { label: 'Comments and mentions', desc: 'When someone mentions you', on: true },
                  { label: 'Product updates', desc: 'New features and improvements', on: false },
                  { label: 'Marketing emails', desc: 'Tips, offers, and news', on: false },
                ].map((n, i) => (
                  <div key={n.label}>
                    {i > 0 && <Separator />}
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                      </div>
                      <Switch defaultChecked={n.on} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {active === 'api' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription>Access DocumentOS AI programmatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Production key</p>
                      <code className="mt-1 block text-xs text-muted-foreground">dcs_live_••••••••••••••••3f9a</code>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.success('Key copied')}>Copy</Button>
                  </div>
                </div>
                <Button onClick={() => toast.success('New API key generated')}>Generate new key</Button>
              </CardContent>
            </Card>
          )}

          {active === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>Keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Current password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>New password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <Button onClick={() => toast.success('Password updated')}>Update password</Button>
              </CardContent>
            </Card>
          )}

          {active === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize how DocumentOS looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Light', 'Dark', 'System'].map((t, i) => (
                      <button
                        key={t}
                        className={cn(
                          'rounded-xl border p-3 text-left transition-colors',
                          i === 2 ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                        )}
                      >
                        <div className={cn('mb-2 h-12 rounded-lg', i === 0 ? 'bg-white border' : i === 1 ? 'bg-slate-900' : 'bg-gradient-to-br from-white to-slate-900')} />
                        <p className="text-xs font-medium text-foreground">{t}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent color</Label>
                  <div className="flex gap-2">
                    {['#2563EB', '#7C3AED', '#0EA5E9', '#059669', '#E11D48'].map((c) => (
                      <button key={c} className="h-8 w-8 rounded-lg border" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {active === 'language' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Language & Region</CardTitle>
                <CardDescription>Set your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific (PST)</SelectItem>
                      <SelectItem value="est">Eastern (EST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="cet">Central Europe (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => toast.success('Preferences saved')}>
                  <Check className="mr-2 h-4 w-4" /> Save
                </Button>
              </CardContent>
            </Card>
          )}

          {active === 'danger' && (
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Export all data</p>
                    <p className="text-xs text-muted-foreground">Download a copy of your documents</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.success('Export started')}>Export</Button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <div>
                    <p className="text-sm font-medium text-destructive">Delete account</p>
                    <p className="text-xs text-muted-foreground">Permanently remove your account and data</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => toast.error('Account deletion requires confirmation')}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
