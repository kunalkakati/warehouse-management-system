import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function DepositorRecordsSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {/* Header controls & filter chips */}
      <div className="space-y-3 border-b bg-gray-50/80 px-5 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search input placeholder */}
          <Skeleton className="h-8 w-full sm:max-w-xs rounded-lg" />

          {/* Agency filter pill placeholders */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>

      {/* Record list item skeletons */}
      <ul className="divide-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <li
            key={i}
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            {/* Left: ID, Name, Address */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-3.5 w-64 max-w-full" />
            </div>

            {/* Right: Agency Tag & Weights */}
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <Skeleton className="h-6 w-20 rounded-full shrink-0" />
              <div className="flex flex-col items-end space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
