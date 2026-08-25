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
    },
  },
});
