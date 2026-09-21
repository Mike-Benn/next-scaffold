import { betterAuth } from 'better-auth';
import { db } from '@/db/db';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from '@/db/schema';
import { APIError } from 'better-auth';
import { envServer } from '@/env.server';
import { authClient } from '@/auth/auth-client';
import { createAuthMiddleware } from 'better-auth/api';
import { eq } from 'drizzle-orm';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        const existing = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, ctx.body.email))
          .limit(1);
        if (existing[0]) {
          throw new APIError('BAD_REQUEST', {
            code: 'USER_ALREADY_EXISTS' satisfies keyof typeof authClient.$ERROR_CODES,
          });
        }
      }
    }),
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    maxPasswordLength: 64,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      if (envServer.NODE_ENV === 'development') {
        console.log(url, user);
      }
      return;
    },
  },
  rateLimit: {
    enabled: true,
    storage: 'database',
    window: 60,
    max: 100,
    customRules: {
      '/send-verification-email': {
        window: 55,
        max: 2,
      },
      '/sign-up/email': {
        window: 60,
        max: 3,
      },
      '/sign-in/email': {
        window: 60,
        max: 5,
      },
    },
  },
});
