import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminDashboardSkeleton from "@/components/skeletons/AdminDashboardSkeleton";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-4 md:p-8">
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </main>
  );
};

export default Page;
