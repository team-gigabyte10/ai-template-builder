'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Check } from 'lucide-react';
import { AuthLayout } from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { toast } from 'sonner';

export default function VerifyPage() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = () => {
    if (value.length < 6) {
      toast.error('Enter the 6-digit code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Email verified successfully');
      router.push('/dashboard');
    }, 800);
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox"
      footer={
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive a code?{' '}
          <button className="font-medium text-primary hover:underline">
            Resend
          </button>
        </p>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="h-7 w-7" />
          </div>
          <div className="flex items-center justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(v) => setValue(v)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <Button onClick={verify} className="w-full" disabled={loading}>
          {loading ? (
            'Verifying…'
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Verify email
            </>
          )}
        </Button>
      </div>
    </AuthLayout>
  );
}
