"use server";

import { redirect } from "next/navigation";

export type FormState = {
  status: "idle" | "success" | "error"; // Strict literal types
  message: string;
  errors?: Record<string, string[]>;
  timestamp: number;
};

export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  console.log("Username:", username);
  console.log("Password:", password);
  console.log("Role:", role);

  return {
    status: "success",
    message: `Hi ${username}, you have successfully logged in as ${role}.`,
    timestamp: Date.now(),
  };
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const officeAddress = formData.get("officeAddress") as string;
  const employeeId = formData.get("employeeId") as string;
  const password = formData.get("password") as string;

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Office Address:", officeAddress);
  console.log("Employee ID:", employeeId);
  console.log("Password:", password);
}
