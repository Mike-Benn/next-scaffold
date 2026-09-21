'use client';

import { VerifyEmail } from '@/app/auth/_components/VerifyEmail';
import { SignUpForm } from '@/app/auth/signup/_components/SignUpForm';
import { useState, useEffect } from 'react';
import { authClient } from '@/auth/auth-client';
type View = 'form' | 'verification';

interface SignUpFlowProps {
  formFooterContent: React.ReactNode;
}

export function SignUpFlow({ formFooterContent }: SignUpFlowProps) {
  const [view, setView] = useState<View>('form');
  const [email, setEmail] = useState('');
  const { data: session, isPending } = authClient.useSession();

  // Redirects automatically if sitting on verify email view and verification is successful in a different tab
  useEffect(() => {
    if (isPending) return;
    if (session?.user?.emailVerified) {
      window.location.href = '/';
    }
  }, [session, isPending]);

  const onFormSuccess = (email: string) => {
    setView('verification');
    setEmail(email);
  };

  return view === 'form' ? (
    <SignUpForm onFormSuccess={onFormSuccess} footerContent={formFooterContent} />
  ) : (
    <VerifyEmail email={email} />
  );
}
