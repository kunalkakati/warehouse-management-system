import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AgencySplitAsideSkeleton() {
  return (
    <aside className="sticky top-6 h-fit rounded-xl border bg-white">
      <div className="border-b bg-gray-50/80 px-5 py-4 space-y-1.5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-3 w-36" />
      </div>
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        {/* Doughnut or bar chart placeholder */}
        <Skeleton className="h-44 w-44 rounded-full" />
        {/* Chart legend items */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 w-full">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </aside>
  );
}
