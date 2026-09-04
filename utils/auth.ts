import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import * as schema from "@/models/schema"; // your drizzle schema
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  baseURL: {
    allowedHosts: [
      "orion-wms.vercel.app", // Production domain
      "*.vercel.app", // Dynamic Vercel preview deployments
      "localhost:3000", // Local development
    ],
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
  //Security
  user: {
    additionalFields: {
      employeeId: {
        type: "string",
        required: true,
      },
      officeAddress: {
        type: "string",
        required: true,
      },
      godownCode: {
        type: "string",
        required: true,
      },
      superAdmin: {
        type: "boolean",
        default: false,
        required: false,
      },
      SuperAdminId: {
        type: "string",
        required: false,
      },
    },
  },
});
