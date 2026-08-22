"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { userRagistrationSchema } from "@/lib/zod/zod.user";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createEmployeeAccount } from "@/lib/actions/auth-action"; // Adjust path as needed
export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
    officeAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credential, setCredential] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCredential(null);

    // 1. Client-side validation
    const validation = userRagistrationSchema.safeParse(formData);

    if (!validation.success) {
      toast.error(`Validation failed: ${validation.error.issues[0].message}`);
      setIsSubmitting(false);
      return; // Exit early
    }

    // 2. Call the Server Action
    const result = await createEmployeeAccount(validation.data);

    if (result.error) {
      toast.error(result.error);
      setIsSubmitting(false);
      return; // Exit early
    }

    // 3. Success Handling
    toast.success("User Successfully Registered");
    setCredential({
      email: validation.data.email,
      password: validation.data.password,
    });

    // 4. Reset form fields manually
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      employeeId: "",
      officeAddress: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={handleRegistration}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Jordan Lee"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="name@example.com"
            />
            <FieldDescription>
              We`&apos;`ll send updates to this address.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="officeAddress">Office Address</FieldLabel>
            <Input
              id="officeAddress"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="123 Main St"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
            <Input
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="EMP123"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="must be at least 8 characters"
            />
          </Field>

          {/* Role */}
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="user">warehouse Operator</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </Field>

          <Field orientation="horizontal">
            {/* Type button to prevent form submission, clears state manually */}
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  role: "",
                  employeeId: "",
                  officeAddress: "",
                })
              }
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      {credential && (
        <div className="mt-6 p-4 border rounded bg-slate-50">
          <h3 className="font-bold text-lg mb-2">
            Registration Successful - Share Credentials
          </h3>
          <p>
            <strong>Email:</strong> {credential.email}
          </p>
          <p>
            <strong>Password:</strong> {credential.password}
          </p>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(
                `Email: ${credential.email} \nPassword: ${credential.password}`,
              );
              toast.success("Credentials copied to clipboard!");
            }}
          >
            Copy Credentials
          </Button>
        </div>
      )}
    </div>
  );
}
