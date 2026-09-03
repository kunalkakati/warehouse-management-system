"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// UI Components
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";

// Types & Actions
import { LocationFormField } from "./form-fields";
import { CreateGodownLocation } from "@/lib/actions/godown-action";
import {
  GodownLocationSchema,
  GodownLocationSchemaType,
  GodownLocationSchemaOutputType,
} from "@/lib/zod/zod.godown";

export default function GodownLocation() {
  // State to hold the successfully created location data for the summary card
  const [newLocation, setNewLocation] =
    useState<GodownLocationSchemaOutputType | null>(null);
  const [fumigationCheck, setFumigationCheck] = useState(false);

  // Initialize React Hook Form
  // We pass 3 generic types to handle the mismatch between Form Input (strings) and Output (numbers) caused by Zod coercion
  const {
    register, // Used for native HTML inputs (like text/number fields)
    control, // Used for custom/controlled UI components (like Checkbox, DatePicker)
    handleSubmit, // Wrapper that runs Zod validation before calling our custom submit function
    reset, // Function to clear the form after successful submission
    formState: { errors, isSubmitting }, // Extracts validation errors and loading state
  } = useForm<
    GodownLocationSchemaType,
    unknown,
    GodownLocationSchemaOutputType
  >({
    resolver: zodResolver(GodownLocationSchema), // Connects Zod schema to Hook Form validation
    defaultValues: {
      godownId: "",
      stackNumber: "",
      maxCapacityKg: "" as unknown, // Initialized as empty string so the input is blank, not '0'
      isFumigated: false,
      lastFumigatedAt: undefined,
    },
  });

  // Function called ONLY if Zod validation passes successfully
  const onFormSubmit = async (data: GodownLocationSchemaOutputType) => {
    try {
      // Call the server action to save the data
      const location = await CreateGodownLocation(data);

      // Check if the server returned a valid response
      if (location && location[0]) {
        setNewLocation(location[0]); // Save response to show in the success card below
        toast.success("Godown location created successfully.");
        reset(); // Clear the form for the next entry
      } else {
        toast.error("Something went wrong! Godown location not created.");
      }
    } catch (error) {
      toast.error("Godown location creation failed. Please try again.");
      console.error("Submission Error:", error);
    }
  };

  /**
   * Helper function to render the appropriate UI component based on the field type defined in `LocationFormField`.
   * This keeps the JSX clean and handles the complex logic for Controllers vs native Inputs.
   */
  const renderFieldInput = (field: (typeof LocationFormField)[number]) => {
    const fieldName = field.name as keyof GodownLocationSchemaType;
    const hasError = !!errors[fieldName];

    switch (field.type) {
      // Custom Checkbox Component (Needs Controller)
      case "checkbox":
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <div className="flex items-center space-x-2 h-10 rounded-md border px-3 py-2 bg-transparent shadow-sm">
                <Checkbox
                  id={field.name}
                  checked={controllerField.value as boolean}
                  onCheckedChange={controllerField.onChange}
                  className="cursor-pointer"
                  onClick={() => setFumigationCheck(!fumigationCheck)}
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer font-normal"
                >
                  {field.placeholder || "Yes, this stack is fumigated"}
                </Label>
              </div>
            )}
          />
        );

      // Custom Date Picker Component (Needs Controller)
      case "date":
        return (
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={`${!fumigationCheck && "hidden"} w-full justify-start text-left font-normal ${
                        !controllerField.value ? "text-muted-foreground" : "" // Gray text if empty
                      } ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""}`} // Red border on error
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {/* Display selected date or fallback to placeholder text */}
                      {controllerField.value ? (
                        format(controllerField.value as Date, "PPP")
                      ) : (
                        <span>{field.placeholder}</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={controllerField.value as Date}
                    onSelect={controllerField.onChange}
                    disabled={(date) => date > new Date()} // Prevent selecting future dates
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        );

      // Native Text / Number Input (Uses simple `register`)
      case "text":
      default:
        // Check if the current field is our number field to assign correct HTML type
        const isNumberField = field.name === "maxCapacityKg";
        return (
          <Input
            id={field.name}
            type={isNumberField ? "number" : "text"}
            placeholder={field.placeholder}
            aria-invalid={hasError}
            className={
              hasError ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            // Spread the register function. If it's the number field, tell Hook Form to convert string to number
            {...register(fieldName, { valueAsNumber: isNumberField })}
          />
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Create Godown Location</CardTitle>
          <CardDescription>
            Enter the details for the new godown and stack location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Form Grid: Automatically stacks on mobile, splits into 2 columns on medium screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LocationFormField.map((field) => (
                <div
                  key={field.name}
                  // Apply 'md:col-span-2' if the field configuration specifically requests full width
                  className={`flex flex-col space-y-2 ${
                    field.span === "full" ? "md:col-span-2" : "col-span-1"
                  }`}
                >
                  <Label
                    htmlFor={field.name}
                    className={`${errors[field.name as keyof GodownLocationSchemaType] && "text-red-500"} ${field.name == "lastFumigatedAt" ? !fumigationCheck && "hidden" : ""}`}
                  >
                    {field.label}
                  </Label>

                  {/* Call the helper function to inject the correct Input/Checkbox/Date picker */}
                  {renderFieldInput(field)}

                  {/* Render Zod validation error messages if they exist for this field */}
                  {errors[field.name as keyof GodownLocationSchemaType] && (
                    <span className="text-xs text-red-500 font-medium">
                      {
                        errors[field.name as keyof GodownLocationSchemaType]
                          ?.message as string
                      }
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Form Submission Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[160px]"
              >
                {/* Show a loading spinner if the form is currently submitting */}
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Location"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Summary View: Only shows after a successful API creation */}
      {newLocation && (
        <Card className="border-green-200 bg-green-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 flex items-center text-lg">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
              Location Created Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground font-medium">Godown ID</p>
                <p className="font-semibold">{newLocation.godownId}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Capacity</p>
                <p className="font-semibold">{newLocation.maxCapacityKg} kg</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Status</p>
                <p className="font-semibold">
                  {newLocation.isFumigated ? "Fumigated" : "Not Fumigated"}
                </p>
              </div>
              {newLocation.lastFumigatedAt && (
                <div>
                  <p className="text-muted-foreground font-medium">
                    Fumigation Date
                  </p>
                  <p className="font-semibold">
                    {format(new Date(newLocation.lastFumigatedAt), "PP")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
