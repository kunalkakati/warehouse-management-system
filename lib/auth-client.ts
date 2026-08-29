import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/utils/auth";

const getBaseURL = () => {
  // 1. Use the explicit public variable if set (Production)
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  // 2. Fall back to Vercel's dynamic preview URL (ensure https:// is added!)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  // 3. Fall back to localhost for local development
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getBaseURL(),
  plugins: [
    // This tells the client to read server's additionalFields schema
    inferAdditionalFields<typeof auth>(),
  ],
});
