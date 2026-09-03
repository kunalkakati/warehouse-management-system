"use server";

import { db } from "@/lib/db";
import { user } from "@/models/auth-schema";
import { eq } from "drizzle-orm";

export const getAllEmployee = async () => {
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
  try {
    const employee = await db
      .update(user)
      .set({ officeAddress: newBranch, updatedAt: new Date() })
      .where(eq(user.id, id))
      .returning();
    return employee;
  } catch (error) {
    console.error("Error in TransferEmployee() ", error);
    throw error;
  }
};
