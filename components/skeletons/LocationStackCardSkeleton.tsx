import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LocationStackCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1.5">
              {/* Stack number label */}
              <Skeleton className="h-5 w-24" />
              {/* Commodity name badge */}
              <Skeleton className="h-3.5 w-32" />
            </div>
            {/* Fumigation / Status badge */}
            <Skeleton className="h-6 w-20 rounded-full" />
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Capacity meter bar */}
            <Skeleton className="h-2.5 w-full rounded-full" />

            {/* Capacity stats readouts */}
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-20" />
            </div>

            {/* Last updated timestamp */}
            <Skeleton className="h-3 w-36 pt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
