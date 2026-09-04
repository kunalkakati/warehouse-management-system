// components/skeletons/FormCardSkeleton.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface FormFieldSkeletonConfig {
  span?: "full" | "half";
}

interface FormCardSkeletonProps {
  /** Optional title width or custom text placeholder size */
  titleWidth?: string;
  /** Explicit list of field spans, OR provide `fieldCount` for default half-width fields */
  fields?: FormFieldSkeletonConfig[];
  /** Fallback count if explicit `fields` config is not passed */
  fieldCount?: number;
  /** Max width container class (defaults to max-w-2xl to match your forms) */
  maxWidth?: string;
  /** Width of the submit button placeholder */
  buttonWidth?: string;
}

export function FormCardSkeleton({
  titleWidth = "w-36",
  fields,
  fieldCount = 6,
  maxWidth = "max-w-2xl",
  buttonWidth = "w-36",
}: FormCardSkeletonProps) {
  // Use provided field spans or fall back to an array of basic half fields
  const fieldList: FormFieldSkeletonConfig[] =
    fields ?? Array.from({ length: fieldCount }, () => ({ span: "half" }));

  return (
    <div className={`mx-auto w-full ${maxWidth} space-y-6 p-4 sm:p-6`}>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1.5">
          {/* Icon + Title */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className={`h-6 ${titleWidth}`} />
          </div>
          {/* Subtitle / Description */}
          <Skeleton className="h-4 w-3/4 max-w-sm" />
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Form grid matching grid-cols-1 sm:grid-cols-2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fieldList.map((field, idx) => (
              <div
                key={idx}
                className={`space-y-2 ${
                  field.span === "full" ? "sm:col-span-2" : ""
                }`}
              >
                {/* Input label placeholder */}
                <Skeleton className="h-4 w-24" />
                {/* Input box placeholder (h-9 matches standard Shadcn input) */}
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            ))}
          </div>

          {/* Action button container */}
          <div className="flex justify-end border-t pt-4">
            <Skeleton className={`h-9 ${buttonWidth} rounded-md`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
