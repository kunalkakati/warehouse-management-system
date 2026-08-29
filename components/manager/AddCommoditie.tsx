"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2, Building2, CheckCircle2 } from "lucide-react";
import { CommoditySchema, CommoditySchemaType } from "@/lib/zod/zod.godown";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommoditie } from "@/lib/actions/godown-action";
import { toast } from "sonner";
import { CommoditieFormFields } from "./form-fields";

const AddCommoditie = () => {
  const [newCommodityInfo, setNewCommodityInfo] =
    useState<CommoditySchemaType | null>(null);
  const [commoditieId, setCommoditieId] = useState("");

  const {
    register, // for plain input
    control, // for seclct input
    handleSubmit, // wrapper for custom submit function. it first validate data, if validation success then it call custom submit function with validated data.
    reset, // reset back to dafult data
    formState: { errors, isSubmitting }, // errors: catch error like validation error
  } = useForm<CommoditySchemaType>({
    resolver: zodResolver(CommoditySchema), // useForm tells zod to varify the data using Commodity Schema.
    defaultValues: {
      name: "",
      category: "",
      standardUnit: "KGS",
      standardBagWeightKg: "",
    },
  });

  const onFormSubmit = async (data: CommoditySchemaType) => {
    try {
      const commoditie = await CreateCommoditie(data);
      if (commoditie && commoditie[0]) {
        setNewCommodityInfo(commoditie[0]);
        setCommoditieId(commoditie[0].id);
      } else {
        toast.error("Something went wrong! commoditie not created.");
        return;
      }
      toast.success("Commoditie created.");
      reset();
    } catch (error) {
      toast.error("Commoditie creation failed. Please try again.");
      console.error("Submission Error:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:p-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-xl">Add Commoditie</CardTitle>
            </div>
            <CardDescription>
              Register a new commoditie to store in the warehouse.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CommoditieFormFields.map((field) => (
                  <div
                    key={field.name}
                    className={`space-y-1.5 ${
                      field.span === "full" ? "sm:col-span-2" : ""
                    }`}
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type == "text" ? (
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
                    ) : (
                      /* If select, use Controller to wrap the custom Select component */
                      <Controller
                        name={field.name}
                        control={control}
                        render={({ field: controllerField }) => (
                          <Select
                            onValueChange={controllerField.onChange}
                            defaultValue={controllerField.value}
                          >
                            <SelectTrigger
                              className={
                                errors[field.name] ? "border-red-500" : ""
                              }
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
                    {errors[field.name] && (
                      <p className="text-xs text-red-500">
                        {errors[field.name]?.message as string}
                      </p>
                    )}
                  </div>
                ))}
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
                    "Create Commodity"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {newCommodityInfo && (
          <Card className="border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20">
            <CardHeader className="flex-row items-center gap-2 space-y-0 pb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
              <CardTitle className="text-base">New Commodity Added</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Comoditie Id</dt>
                  <dd className="font-medium">{commoditieId}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium">{newCommodityInfo.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">{newCommodityInfo.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Standard Unit</dt>
                  <dd className="font-medium">
                    {newCommodityInfo.standardUnit}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Bag Weight (Kg)</dt>
                  <dd className="font-medium">
                    {newCommodityInfo.standardBagWeightKg || "—"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddCommoditie;
