import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StockStatsBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              {/* Stat title placeholder */}
              <Skeleton className="h-4 w-24" />
              {/* Icon / small tag placeholder */}
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            {/* Metric number */}
            <Skeleton className="h-8 w-28" />
            {/* Subtext / percentage comparison */}
            <Skeleton className="h-3 w-36" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
