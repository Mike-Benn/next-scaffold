import { z } from 'zod';

const clientSchema = z.object({
  BETTER_AUTH_URL: z.string(),
});

const parsed = clientSchema.safeParse({
  BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

if (!parsed.success) {
  console.error(
    '❌ Invalid client environment variables:',
    z.flattenError(parsed.error).fieldErrors,
  );
  throw new Error('Invalid client environment variables');
}

export const envClient = parsed.data;
