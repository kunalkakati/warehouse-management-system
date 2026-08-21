"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/lib/actions/auth-action";
import { useActionState, useEffect } from "react";
import { type FormState } from "@/types/type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const initialState: FormState = {
  status: "idle",
  message: "",
  timestamp: 0,
};

const Registration = () => {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push("/dashboard");
      //TODO: Redirect to dashboard or home page after successful registration
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.timestamp, state.status, state.message, router]);

  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          {/* Name  */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" name="name" placeholder="Jordan Lee" />
          </Field>
          {/* eMail */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              name="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>
          {/* Office Address  */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-office-address">
              Office Address
            </FieldLabel>
            <Input
              id="fieldgroup-office-address"
              name="officeAddress"
              placeholder="123 Main St"
            />
          </Field>
          {/* Employee Id  */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-employee-id">
              Employee ID
            </FieldLabel>
            <Input
              id="fieldgroup-employee-id"
              name="employeeId"
              placeholder="EMP123"
            />
          </Field>
          {/* Password  */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              id="fieldgroup-password"
              type="password"
              name="password"
              placeholder="must be at least 8 characters"
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "Submiting" : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Registration;
