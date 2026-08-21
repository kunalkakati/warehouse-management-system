import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import * as schema from "@/models/schema"; // your drizzle schema

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  //Security
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false, // did this so that the role is not settable by the user during registration
      },
      employeeId: {
        type: "string",
        required: true,
      },
      officeAddress: {
        type: "string",
        required: true,
      },
    },
  },
});
