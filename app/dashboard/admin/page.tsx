import AdminDashboard from "@/components/admin/AdminDashboard";
import React from "react";

const Page = async () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-4 md:p-8">
      <AdminDashboard />
    </main>
  );
};

export default Page;
