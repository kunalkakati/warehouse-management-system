"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loginAction, type FormState } from "@/lib/actions/auth-action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: FormState = {
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
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.timestamp, state.status, state.message]);
  const roles = [
    { label: "Admin", value: "ADMIN" },
    { label: "Manager", value: "MANAGER" },
    { label: "Employee", value: "EMPLOYEE" },
  ];
  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
          <Input
            id="fieldgroup-name"
            type="text"
            name="username"
            placeholder="Jordan Lee"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <FieldDescription>
            Contect the administrator if you have trouble logging in.
          </FieldDescription>
        </Field>
        <Select
          items={roles}
          name="role"
          defaultValue="Select a role"
          aria-label="Select a role"
        >
          <SelectTrigger id="form-country">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
