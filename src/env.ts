import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', z.flattenError(parsed.error).fieldErrors);
  throw new Error('Invalid environment variables');
}

export const ENV = parsed.data;
