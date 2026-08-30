// components/inventory/DynamicField.tsx
"use client";

import React from "react";
import { Controller, UseFormRegister, Control } from "react-hook-form";
import { InsertGoodsInwardInputType } from "@/lib/zod/zod.godown.transaction";
import { FieldConfig } from "./inventory-in.config";
// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DynamicFieldProps {
  field: FieldConfig;
  register: UseFormRegister<InsertGoodsInwardInputType>;
  control: Control<InsertGoodsInwardInputType>;
  error?: { message?: string };
}

export const DynamicField = ({
  field,
  register,
  control,
  error,
}: DynamicFieldProps) => {
  // Make the field span across the whole grid if span is set to "full"
  const spanClass = field.span === "full" ? "md:col-span-2 lg:col-span-3" : "";

  return (
    <div className={`flex flex-col gap-2 ${spanClass}`}>
      <Label htmlFor={field.name} className={error ? "text-red-500" : ""}>
        {field.label}
      </Label>

      {/* RENDER STANDARD INPUT */}
      {field.type !== "select" ? (
        <Input
          id={field.name}
          type={field.type === "number" ? "number" : "text"}
          {...register(field.name)}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          className={`transition-all ${
            error
              ? "border-red-500 focus-visible:ring-red-500"
              : "focus-visible:ring-blue-500"
          }`}
        />
      ) : (
        /* RENDER SELECT INPUT */
        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField }) => (
            <Select
              onValueChange={controllerField.onChange}
              defaultValue={controllerField.value as string}
            >
              <SelectTrigger
                id={field.name}
                className={error ? "border-red-500 ring-red-500" : ""}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}

      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <span className="text-xs font-medium text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};
