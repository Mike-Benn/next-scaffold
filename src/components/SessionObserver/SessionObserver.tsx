'use client';
import { authClient } from '@/auth/auth-client';
import { useEffect } from 'react';

export function SessionObserver() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      window.location.href = '/auth/login';
    }
  }, [session, isPending]);

  return null;
}
