// components/inventory/InventoryIn.tsx
"use client";

import React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

// Types, Configs, and Actions
import {
  goodsOutwardSchema,
  InsertGoodsOutwardInputType,
} from "@/lib/zod/zod.godown.transaction";
import { processGoodsOutward } from "@/lib/actions/outwardGood-action";
import { GOODS_OUTWARD_FIELDS } from "./inventory-out.config";

// Sub-components & UI
import { DynamicOutField } from "./DynamicField.out";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function InventoryOut() {
  // 1. Initialize Form State
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InsertGoodsOutwardInputType>({
    resolver: zodResolver(goodsOutwardSchema),
    defaultValues: {
      dispatchNumber: "",
      depositorId: "",
      commodityId: "",
      locationId: "",
      truckNumber: "",
      driverName: "",
      gatePassNumber: "",
      netWeightKg: "",
      bagCount: undefined,
      status: "PENDING",
      remarks: "",
    },
  });

  // 2. Handle Valid Submission
  const onValidSubmit = async (data: InsertGoodsOutwardInputType) => {
    const formattedData = {
      ...data,
      bagCount: Number(data.bagCount) || 0,
    };

    try {
      await processGoodsOutward(formattedData);
      toast.success("Good out register successfully");
      reset(); // Clear form on success
    } catch (error) {
      console.error("Database submission failed:", error);
      toast.error("Something Wrong with database! try again.");
    }
  };

  // 3. Handle Invalid Submission (For debugging)
  const onInvalidSubmit = (
    errors: FieldErrors<InsertGoodsOutwardInputType>,
  ) => {
    console.error("Zod Validation Failed:", errors);
  };

  // 4. Render Layout
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex items-start justify-center">
      <Card className="w-full max-w-5xl shadow-sm border-slate-200">
        <CardHeader className="border-b bg-slate-50/50 pb-6">
          <CardTitle className="text-2xl font-semibold text-slate-800">
            Goods Outward Entry
          </CardTitle>
          <CardDescription>
            Record outgoing inventory, vehicle details, and weight metrics.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            className="space-y-8"
          >
            {/* RENDER FIELDS DYNAMICALLY */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
              {GOODS_OUTWARD_FIELDS.map((field) => (
                <DynamicOutField
                  key={field.name}
                  field={field}
                  register={register}
                  control={control}
                  error={errors[field.name]}
                />
              ))}
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-37.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Entry"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
