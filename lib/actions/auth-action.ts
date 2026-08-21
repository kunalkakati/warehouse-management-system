"use server";

import { type FormState } from "@/types/type";
import { userLoginSchema, userRagistrationSchema } from "@/lib/zod/zod.user";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/utils/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

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

export async function registerAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    employeeId: formData.get("employeeId") as string,
    officeAddress: formData.get("officeAddress") as string,
  };

  const validate = userRagistrationSchema.safeParse(payload);

  if (validate.success) {
    //TODO: Registration
    try {
      const data = await auth.api.signUpEmail({
        body: {
          name: validate.data.name, // required
          email: validate.data.email, // required
          password: validate.data.password, // required
          employeeId: validate.data.employeeId,
          officeAddress: validate.data.officeAddress,
        },
        headers: await headers(),
      });
      if (data.user) {
        return {
          status: "success",
          message: `User Successfuly registered`,
          timestamp: Date.now(),
        };
      } else {
        // signUpEmail resolved but no user came back — treat as failure
        return {
          status: "error",
          message: "Registration failed. Please try again.",
          timestamp: Date.now(),
        };
      }
    } catch (error) {
      if (
        error instanceof APIError &&
        error.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        // error.status is the HTTP-style status code, error.body has the code/message
        console.error("Registration Error: ", error.status, error.body);

        return {
          status: "error",
          message: error.message || "Registration failed. Please try again.",
          timestamp: Date.now(),
        };
      } else {
        // non-Better-Auth error (network, unexpected throw, etc.)
        console.error("Unexpected Registration Error: ", error);
        return {
          status: "error",
          message: "Something went wrong. Please try again.",
          timestamp: Date.now(),
        };
      }
    }
  } else {
    console.error("Validation Error: ", validate.error.issues);
    return {
      status: "error",
      message: `${validate.error.issues[0].message}`,
      timestamp: Date.now(),
    };
  }
}
