"use server";

import { type FormState } from "@/types/type";
import { userLoginSchema } from "@/lib/zod/zod.user";
import { authClient } from "@/lib/auth-client";

export async function loginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Extract the form data and create a payload object for validation
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // Validate the payload using Zod schema
  const validate = userLoginSchema.safeParse(payload);
  if (validate.success) {
    // if success sign-in
    const { data, error } = await authClient.signIn.email(
      {
        email: validate.data.email,
        password: validate.data.password,
        rememberMe: true,
      },
      {
        //callbacks
        onSuccess: (data) => {
          console.log("Login Success: ", data);
        },
      },
    );
    if (!error) {
      return {
        status: "success",
        message: `Hi, you have successfully logged in.`,
        timestamp: Date.now(),
      };
    } else {
      return {
        status: "error",
        message: `Login failed. Please check your credentials and try again.`,
        timestamp: Date.now(),
      };
    }
  } else {
    return {
      status: "error",
      message: `${validate.error.issues[0].message}`,
      timestamp: Date.now(),
    };
  }

  // sign in logic here
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
