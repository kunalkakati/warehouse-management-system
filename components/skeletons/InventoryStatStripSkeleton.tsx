import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function InventoryStatStripSkeleton() {
  return (
    <section className="grid grid-cols-2 divide-x divide-y divide-gray-100 rounded-xl border bg-white sm:grid-cols-4 sm:divide-y-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5 px-5 py-4">
          {/* Dot indicator */}
          <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
          <div className="w-full space-y-1.5">
            {/* Metric value */}
            <Skeleton className="h-5 w-24" />
            {/* Label */}
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </section>
  );
}
