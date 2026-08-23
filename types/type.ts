import { user } from "@/models/auth-schema";
import { InferSelectModel } from "drizzle-orm";

export type Employee = InferSelectModel<typeof user>;

export type FormState = {
  status: "idle" | "success" | "error"; // Strict literal types
  message: string;
  errors?: Record<string, string[]>;
  timestamp: number;
};
