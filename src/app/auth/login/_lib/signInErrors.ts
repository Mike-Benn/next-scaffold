import type { authClient } from '@/auth/auth-client';

export const signInErrorCodes = [
  'INVALID_EMAIL',
  'INVALID_EMAIL_OR_PASSWORD',
  'EMAIL_NOT_VERIFIED',
] as const satisfies readonly (keyof typeof authClient.$ERROR_CODES)[];

export type SignInErrorCode = (typeof signInErrorCodes)[number];

export function isSignInErrorCode(code: unknown): code is SignInErrorCode {
  return (signInErrorCodes as readonly unknown[]).includes(code);
}
