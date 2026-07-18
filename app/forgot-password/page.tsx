'use client';

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Reset link sent to your email');
    }, 800);
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="We'll send a reset link to your email"
      footer={
        <a
          href="/login"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </a>
      }
    >
      {sent ? (
        <div className="rounded-xl border bg-success/10 p-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success">
            <Mail className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Check your inbox
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            We sent a password reset link to your email address.
          </p>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setSent(false)}
          >
            Resend link
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="pl-9"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
