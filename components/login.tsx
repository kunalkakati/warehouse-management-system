"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { loginAction } from "@/lib/actions/auth-action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { type FormState } from "@/types/type";

export const initialState: FormState = {
  status: "idle",
  message: "",
  timestamp: 0,
};

export default function Login() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      // TODO: Redirect to dashboard or home page after successful login
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.timestamp, state.status, state.message]);

  return (
    <form action={formAction}>
      <FieldGroup>
        {/* email */}
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name="email"
            placeholder="your_email@example.com"
            autoComplete="email"
            required
          />
        </Field>
        {/* password */}
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            required
          />
          <FieldDescription>
            Contact the administrator if you have trouble logging in.
          </FieldDescription>
        </Field>
        {/* role selection */}
        {/* Buttons */}
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
