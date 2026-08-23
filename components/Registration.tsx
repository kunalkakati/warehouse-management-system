"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userRagistrationSchema } from "@/lib/zod/zod.user";
import { createEmployeeAccount } from "@/lib/actions/auth-action"; // Adjust path as needed
import { toast } from "sonner";
import { Check, Copy, X } from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Registration() {
  const router = useRouter();
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
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string | null) => {
    setFormData({ ...formData, role: value ?? "" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      employeeId: "",
      officeAddress: "",
    });
    setCredential(null);
    setIsCopied(false);
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
      return;
    }

    // 2. Call the Server Action
    const result = await createEmployeeAccount(validation.data);

    if (result.error) {
      toast.error(result.error);
      setIsSubmitting(false);
      return;
    }

    // 3. Success Handling
    toast.success("User Successfully Registered");
    setCredential({
      email: validation.data.email,
      password: validation.data.password,
    });

    // 4. Reset form fields
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

  const copyToClipboard = () => {
    if (credential) {
      navigator.clipboard.writeText(
        `Email: ${credential.email}\nPassword: ${credential.password}`,
      );
      setIsCopied(true);
      toast.success("Credentials copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/40 p-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        <div className="w-full max-w-2xl shrink-0">
          {/* Added 'relative' to the card to anchor the absolute position of the close button */}
          <Card className="relative shadow-lg">
            {/* Go Back / Close Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>

            <CardHeader className="pr-12">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Employee Registration
              </CardTitle>
              <CardDescription>
                Create a new account for an employee and assign their role.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleRegistration}>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Jordan Lee"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
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
                  <p className="text-[0.8rem] text-muted-foreground">
                    Use office email address
                  </p>
                </div>

                {/* Employee ID */}
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="EMP123"
                  />
                </div>

                {/* Role (Shadcn Select) */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Warehouse Operator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Office Address */}
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="officeAddress">Office Address</Label>
                  <Input
                    id="officeAddress"
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="123 Main St, City, Region"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Must be at least 8 characters"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 bg-muted/20 px-6 py-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={resetForm}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register Employee"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        {/* Success Credential Block */}
        {credential && (
          <div className="w-full lg:max-w-md shrink-0">
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800 dark:text-green-400">
                  Registration Successful
                </CardTitle>
                <CardDescription>
                  Please securely share these generated credentials with the
                  employee.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-md bg-white dark:bg-gray-900 border">
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-semibold text-muted-foreground">
                        Email:
                      </span>{" "}
                      {credential.email}
                    </p>
                    <p>
                      <span className="font-semibold text-muted-foreground">
                        Password:
                      </span>{" "}
                      {credential.password}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyToClipboard}
                    className="shrink-0"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {isCopied ? "Copied!" : "Copy Credentials"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
