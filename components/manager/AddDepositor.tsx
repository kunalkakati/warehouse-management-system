"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Building2, CheckCircle2 } from "lucide-react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DepositorSchema, DepositorSchemaType } from "@/lib/zod/zod.godown";
import { CreateDepositor } from "@/lib/actions/godown-action";
import { DepositorFormFields } from "./form-fields";
import { authClient } from "@/lib/auth-client";

const agencyTypeOptions = [
  { value: "PRIVATE_TRADER", label: "Private Trader" },
  { value: "GOVERNMENT", label: "Government" },
  { value: "FARMER_COOPERATIVE", label: "Farmer Cooperative" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "OTHER", label: "Other" },
] as const;

const AddDepositor = () => {
  const [newDepositorInfo, setNewDepositorInfo] =
    useState<DepositorSchemaType | null>(null);

  const { data: session } = authClient.useSession();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepositorSchemaType>({
    resolver: zodResolver(DepositorSchema),
    defaultValues: {
      name: "",
      agencyType: "OTHER",
      gstin: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const onFormSubmit = async (data: DepositorSchemaType) => {
    try {
      const payload = {
        ...data,
        godown_code: session?.user?.godownCode || "NOT SET",
      };
      const newDepositor = await CreateDepositor(payload);
      const created = newDepositor?.[0];
      if (!created) {
        toast.error("Depositor creation failed. Please try again.");
        return;
      }
      toast.success("Depositor created.");
      setNewDepositorInfo(created);
      reset();
    } catch (error) {
      toast.error("Depositor creation failed. Please try again.");
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:p-6">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl">Add Depositor</CardTitle>
          </div>
          <CardDescription>
            Register a new depositor to store goods in the warehouse.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DepositorFormFields.map((field) => (
                <div
                  key={field.name}
                  className={`space-y-1.5 ${
                    field.span === "full" ? "sm:col-span-2" : ""
                  }`}
                >
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    aria-invalid={!!errors[field.name]}
                    className={
                      errors[field.name]
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors[field.name] && (
                    <p className="text-xs text-red-500">
                      {errors[field.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="agencyType">Agency Type</Label>
                <Controller
                  name="agencyType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="agencyType"
                        className={
                          errors.agencyType
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }
                      >
                        <SelectValue placeholder="Select agency type" />
                      </SelectTrigger>
                      <SelectContent>
                        {agencyTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.agencyType && (
                  <p className="text-xs text-red-500">
                    {errors.agencyType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-36"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Depositor"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {newDepositorInfo && (
        <Card className="border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
            <CardTitle className="text-base">New Depositor Added</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{newDepositorInfo.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Agency Type</dt>
                <dd className="font-medium">{newDepositorInfo.agencyType}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">GSTIN</dt>
                <dd className="font-medium">{newDepositorInfo.gstin || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{newDepositorInfo.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">{newDepositorInfo.email || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Address</dt>
                <dd className="font-medium">
                  {newDepositorInfo.address || "—"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddDepositor;
