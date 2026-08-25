"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { godownSchema } from "@/lib/zod/zod.godown";
import { CreateGodown } from "@/lib/actions/godown-action";
import { GodownType } from "@/types/type";
import { Loader2, CheckCircle2, Building2 } from "lucide-react"; // Assuming you use lucide-react (standard with shadcn)

// Infer the TypeScript type directly from your Zod schema
type GodownFormValues = z.input<typeof godownSchema>;

const NewGodown = () => {
  const [newGodownDetail, setNewGodownDetail] = useState<GodownType | null>(
    null,
  );

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GodownFormValues>({
    resolver: zodResolver(godownSchema),
    defaultValues: {
      name: "",
      code: "",
      managerName: "",
      totalCapacityMt: undefined, // Adjust if your schema expects a number here
      address: "",
    },
  });

  const onSubmit = async (data: GodownFormValues) => {
    try {
      // Ensure totalCapacityMt is passed as a string per your original logic
      const payload = {
        ...data,
        totalCapacityMt: String(data.totalCapacityMt),
      };

      const newGodown = await CreateGodown(payload);

      if (newGodown && newGodown[0]) {
        setNewGodownDetail(newGodown[0]);
        toast.success("Godown created successfully!");
        reset(); // Clear form on success
      }
    } catch (error) {
      toast.error("Godown addition failed! Please try again.");
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-5 border-b bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-500" />
            Add New Godown
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the details to register a new storage facility in the system.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Responsive Grid for Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Godown Name
                </label>
                <Input
                  {...register("name")}
                  placeholder="e.g., Central Warehouse Alpha"
                  className={
                    errors.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Godown Code
                </label>
                <Input
                  {...register("code")}
                  placeholder="e.g., CWA-001"
                  className={
                    errors.code
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.code && (
                  <p className="text-xs text-red-500">{errors.code.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Manager in Charge
                </label>
                <Input
                  {...register("managerName")}
                  placeholder="Manager's full name"
                  className={
                    errors.managerName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.managerName && (
                  <p className="text-xs text-red-500">
                    {errors.managerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Capacity (MT)
                </label>
                <Input
                  {...register("totalCapacityMt")}
                  type="number"
                  step="0.01"
                  placeholder="e.g., 5000.50"
                  className={
                    errors.totalCapacityMt
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.totalCapacityMt && (
                  <p className="text-xs text-red-500">
                    {errors.totalCapacityMt.message}
                  </p>
                )}
              </div>

              {/* Full width address input */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Godown Address
                </label>
                <Input
                  {...register("address")}
                  placeholder="Full physical address of the facility"
                  className={
                    errors.address
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.address && (
                  <p className="text-xs text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-35"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Godown"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Details Card */}
      {newGodownDetail && (
        <div className="mt-8 p-6 bg-green-50/50 border border-green-200 rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">
              Godown Successfully Created
            </h3>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded-md border border-green-100">
              <dt className="text-gray-500 font-medium mb-1">Name</dt>
              <dd className="font-semibold text-gray-900">
                {newGodownDetail.name}
              </dd>
            </div>
            <div className="bg-white p-3 rounded-md border border-green-100">
              <dt className="text-gray-500 font-medium mb-1">Code</dt>
              <dd className="font-semibold text-gray-900">
                {newGodownDetail.code}
              </dd>
            </div>
            <div className="bg-white p-3 rounded-md border border-green-100">
              <dt className="text-gray-500 font-medium mb-1">Manager</dt>
              <dd className="font-semibold text-gray-900">
                {newGodownDetail.managerName}
              </dd>
            </div>
            <div className="bg-white p-3 rounded-md border border-green-100">
              <dt className="text-gray-500 font-medium mb-1">Capacity</dt>
              <dd className="font-semibold text-gray-900">
                {newGodownDetail.totalCapacityMt} MT
              </dd>
            </div>
            <div className="bg-white p-3 rounded-md border border-green-100 sm:col-span-2 lg:col-span-2">
              <dt className="text-gray-500 font-medium mb-1">Location</dt>
              <dd className="font-semibold text-gray-900">
                {newGodownDetail.address}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default NewGodown;
