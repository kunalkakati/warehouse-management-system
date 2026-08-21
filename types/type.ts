export type FormState = {
  status: "idle" | "success" | "error"; // Strict literal types
  message: string;
  errors?: Record<string, string[]>;
  timestamp: number;
};
