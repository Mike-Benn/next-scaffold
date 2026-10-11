import { drizzle } from 'drizzle-orm/neon-http';
import { envServer } from '@/env.server';
import * as schema from '@/db/schema';

export const db = drizzle(envServer.DATABASE_URL, { schema });
