"use server";

import { auth } from "@/utils/auth";
import { userRagistrationSchema } from "@/lib/zod/zod.user";

export async function createEmployeeAccount(payload: unknown) {
  // 1. Validate on the server to ensure data integrity
  const validation = userRagistrationSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || "Invalid data provided.",
    };
  }

  const { name, email, password, employeeId, officeAddress } = validation.data;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        // Assuming your Better Auth schema is configured to accept these custom fields:
        employeeId,
        officeAddress,
      },
    });

    if (!response || !response.user) {
      return { error: "Failed to create user. Please try again." };
    }

    return { success: true, user: response.user };
  } catch (error: unknown) {
    const authError = error as { body?: { code?: string }; message?: string };
    if (authError.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      return { error: "Email already exists. Try a different email." };
    }

    console.error("Server Action Registration Error:", error);
    return { error: "An unexpected error occurred during registration." };
  }
}
