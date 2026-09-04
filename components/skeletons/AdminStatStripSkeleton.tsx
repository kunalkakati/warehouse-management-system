import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminStatStripSkeleton() {
  return (
    <section className="flex divide-x rounded-xl border bg-white">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-1 items-center gap-2.5 px-5 py-3.5 first:pl-4"
        >
          {/* Dot placeholder */}
          <Skeleton className="h-2 w-2 rounded-full shrink-0" />

          <div className="space-y-1.5 w-full">
            {/* Number value */}
            <Skeleton className="h-5 w-8" />
            {/* Label */}
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      ))}
    </section>
  );
}
