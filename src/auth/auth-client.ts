import { createAuthClient } from 'better-auth/react';
import { envClient } from '@/env.client';

export const authClient = createAuthClient({
  baseURL: envClient.BETTER_AUTH_URL,
});
