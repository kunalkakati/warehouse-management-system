import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StockStatsBoardSkeleton } from "./StockStatsBoardSkeleton";
import { LocationStackCardSkeleton } from "./LocationStackCardSkeleton";
import { StackInfoTableSkeleton } from "./StackInfoTableSkeleton";

export default function GodownInsightSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Banner Skeleton */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2.5">
            {/* Title + Code badge */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>

            {/* Manager and Location line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Metric Cards Grid */}
      <StockStatsBoardSkeleton />

      {/* Stack Utilization Cards */}
      <LocationStackCardSkeleton />

      {/* Inventory Breakdown Table */}
      <StackInfoTableSkeleton />
    </div>
  );
}
