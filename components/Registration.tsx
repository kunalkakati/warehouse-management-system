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

const Registration = () => {
  return (
    <div>
      <form action={registerAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" name="name" placeholder="Jordan Lee" />
          </Field>
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
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Registration;
