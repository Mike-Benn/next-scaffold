'use client';

import type { ReactNode } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiError } from '@/app/_lib/api';

function handleUnauthorizedError(error: unknown) {
  if (typeof window !== 'undefined' && error instanceof ApiError && error.status === 401) {
    window.location.href = '/';
  }
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: handleUnauthorizedError }),
    mutationCache: new MutationCache({ onError: handleUnauthorizedError }),
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient();
  return (browserQueryClient ??= makeQueryClient());
}

export function Providers({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}
