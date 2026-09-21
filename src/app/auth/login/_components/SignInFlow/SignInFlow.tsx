'use client';

import { useState, useEffect } from 'react';
import { SignInForm } from '@/app/auth/login/_components/SignInForm';
import { VerifyEmail } from '@/app/auth/_components/VerifyEmail';
import { authClient } from '@/auth/auth-client';

type View = 'form' | 'verification';

export function SignInFlow() {
  const [view, setView] = useState<View>('form');
  const [email, setEmail] = useState('');
  const { data: session, isPending } = authClient.useSession();

  // Redirects automatically if sitting on verify email view and verification is successful in a different tab
  useEffect(() => {
    if (isPending) return;
    if (session?.user?.emailVerified) {
      window.location.href = '/';
    }
  }, [session]);
  const onEmailNotVerified = (email: string) => {
    setView('verification');
    setEmail(email);
  };

  return view === 'form' ? (
    <SignInForm onEmailNotVerified={onEmailNotVerified} />
  ) : (
    <VerifyEmail email={email} />
  );
}
