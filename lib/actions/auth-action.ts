"use server";

import { auth } from "@/utils/auth";
import { userRagistrationSchema } from "@/lib/zod/zod.user";
import { headers } from "next/headers";

export async function createEmployeeAccount(payload: unknown) {
  // 1. Validate on the server to ensure data integrity
  const validation = userRagistrationSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || "Invalid data provided.",
    };
  }

  const { name, email, password, godownCode, role, employeeId, officeAddress } =
    validation.data;
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        godownCode,
        name,
        employeeId,
        officeAddress,
      },
    });

    if (!response || !response.user) {
      return { error: "Failed to create user. Please try again." };
    }

    await auth.api.setRole({
      body: {
        userId: response.user.id,
        role: role as "user" | "admin",
      },
      // CRITICAL: Pass headers so Better Auth verifies you are an Admin!
      headers: await headers(),
    });

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
