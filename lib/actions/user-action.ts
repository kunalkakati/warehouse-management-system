"use server";

import { db } from "@/lib/db";
import { user } from "@/models/auth-schema";

export const getAllEmployee = async () => {
  try {
    const users = await db.select().from(user);
    return users;
  } catch (error) {
    console.error("Error in getAllEMployee() ", error);
    throw error;
  }
};
