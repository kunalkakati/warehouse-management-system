import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless"; // ✅ Switch to neon-serverless
import * as schema from "@/models/schema";

// Create a connection pool instead of a single HTTP connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

// Pass the pool to drizzle
export const db = drizzle(pool, { schema });
