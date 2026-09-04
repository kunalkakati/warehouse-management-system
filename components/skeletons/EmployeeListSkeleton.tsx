import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search / Filter toolbar placeholder */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-9 w-64 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* Directory rows container */}
      <div className="rounded-xl border bg-white divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-1.5">
                {/* Employee Name */}
                <Skeleton className="h-4 w-32" />
                {/* Email / Role */}
                <Skeleton className="h-3 w-48" />
              </div>
            </div>

            {/* Warehouse / Status badge placeholders */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
