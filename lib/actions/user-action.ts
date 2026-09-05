"use server";

import { db } from "@/lib/db";
import { user } from "@/models/auth-schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/lib/authorization";

export const getAllEmployee = async () => {
  await requireRole(["admin"]);
  try {
    const users = await db.query.user.findMany({
      with: {
        godown: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error in getAllEmployee() ", error);
    throw error;
  }
};

export const GetEmployeeInfo = async (e_id: string) => {
  await requireRole(["admin"]);
  try {
    const employee = await db
      .select()
      .from(user)
      .where(eq(user.employeeId, e_id));
    return employee;
  } catch (error) {
    console.error("Error in TransferEmployee() ", error);
    throw error;
  }
};

export const TransferEmployee = async (
  id: string,
  newBranch: string | null,
) => {
  await requireRole(["admin"]);
  if (!newBranch) {
    throw new Error("A destination godown is required.");
  }
  try {
    const employee = await db
      .update(user)
      .set({
        officeAddress: newBranch,
        godownCode: newBranch,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id))
      .returning();
    return employee;
  } catch (error) {
    console.error("Error in TransferEmployee() ", error);
    throw error;
  }
};
