import { authClient } from '@/auth/auth-client';

export const signInErrorCodes = ['INVALID_EMAIL', 'INVALID_EMAIL_OR_PASSWORD'] satisfies Array<
  keyof typeof authClient.$ERROR_CODES
>;
