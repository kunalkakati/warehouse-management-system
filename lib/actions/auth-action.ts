"use server";

import { auth } from "@/utils/auth";
import { userRagistrationSchema } from "@/lib/zod/zod.user";
import { headers } from "next/headers";
import { requireRole } from "@/lib/authorization";
import { db } from "@/lib/db";
import { user } from "@/models/auth-schema";
import { eq } from "drizzle-orm";

export async function createEmployeeAccount(payload: unknown) {
  const session = await requireRole(["admin"]);
  // 1. Validate on the server to ensure data integrity
  const validation = userRagistrationSchema.safeParse(payload);

  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || "Invalid data provided.",
    };
  }

  const { name, email, password, godownCode, role, employeeId, officeAddress } =
    validation.data;
  if (role === "admin" && !session.user.superAdmin) {
    return { error: "Only a super administrator can create admin accounts." };
  }
  if (!session.user.superAdmin && session.user.godownCode !== godownCode) {
    return { error: "Employees must belong to your assigned godown." };
  }
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
      headers: await headers(),
    });

    if (!response || !response.user) {
      return { error: "Failed to create user. Please try again." };
    }

    await db
      .update(user)
      .set({ role, updatedAt: new Date() })
      .where(eq(user.id, response.user.id));

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
