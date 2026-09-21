import { z } from 'zod';

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
});

const parsed = serverSchema.safeParse({
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid client environment variables:',
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error('Invalid client environment variables');
}

export const envServer = parsed.data;
