import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless"; // ✅ Switch to neon-serverless
import * as schema from "@/models/schema";

const db_string = process.env.DATABASE_URL;
if (!db_string) {
  throw new Error("DATABASE_URL is required to start the application.");
}
// Create a connection pool instead of a single HTTP connection
const pool = new Pool({ connectionString: db_string });

// Pass the pool to drizzle
export const db = drizzle(pool, { schema });
