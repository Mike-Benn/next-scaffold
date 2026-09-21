import { drizzle } from 'drizzle-orm/neon-http';
import { envServer } from '@/env.server';

export const db = drizzle(envServer.DATABASE_URL);
