import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For the Amazon clone demo, we'll use an in-memory mock database
// In production, you would set DATABASE_URL to a real database
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set. Using mock database for demo purposes.");
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });