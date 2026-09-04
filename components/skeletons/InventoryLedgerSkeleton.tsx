import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { InventoryStatStripSkeleton } from "./InventoryStatStripSkeleton";
import { DepositorRecordsSkeleton } from "./DepositorRecordsSkeleton";
import { AgencySplitAsideSkeleton } from "./AgencySplitAsideSkeleton";

export default function InventoryLedgerSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] px-4 py-8 text-gray-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Inventory Ledger
            </h1>
            <p className="text-sm text-gray-500">
              Warehouse holdings across every depositor account.
            </p>
          </div>
          {/* Live badge pill */}
          <Skeleton className="h-7 w-28 rounded-full" />
        </header>

        {/* Stat strip */}
        <InventoryStatStripSkeleton />

        {/* Main section: Records list + Aside chart */}
        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr] xl:items-start">
          <DepositorRecordsSkeleton />
          <AgencySplitAsideSkeleton />
        </section>
      </div>
    </div>
  );
}
