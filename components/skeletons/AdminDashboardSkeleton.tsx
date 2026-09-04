import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminStatStripSkeleton } from "./AdminStatStripSkeleton";
import { EmployeeListSkeleton } from "./EmployeeListSkeleton";

export default function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header: title + compact action icons */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Personnel, godowns, and daily operations.
          </p>
        </div>

        {/* 4 action icon placeholders (matches h-10 w-10 flex gap-2) */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-lg shrink-0" />
          ))}
        </div>
      </section>

      {/* Stat strip skeleton */}
      <AdminStatStripSkeleton />

      {/* Directory Section */}
      <section className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Employee Directory
          </h2>
          <p className="text-sm text-gray-500">
            Manage personnel roles and warehouse assignments.
          </p>
        </div>

        {/* Directory List skeleton */}
        <EmployeeListSkeleton />
      </section>
    </div>
  );
}
