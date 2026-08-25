import React from "react";
import { getAllEmployee } from "@/lib/actions/user-action";
import EmployeeList from "./EmployeeList";
import Link from "next/link";
import { Users, UserPlus, ArrowRightLeft, CalendarCheck } from "lucide-react";

const AdminDashboard = async () => {
  const data = await getAllEmployee();

  return (
    <div className="space-y-8">
      {/* Metric Cards Section
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Total Employees
            </h3>
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-3xl font-bold">{data.length + 1}</div>
        </div>
      </section> */}

      {/* Quick Actions Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-gray-900">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/admin/register"
            className="group flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
          >
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors group-hover:bg-blue-200">
              <UserPlus className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700">Add Employee</span>
          </Link>

          <Link
            href="/dashboard/admin/godown/add"
            className="group flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
          >
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors group-hover:bg-blue-200">
              <UserPlus className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700">Add new Godown</span>
          </Link>

          <Link
            href="/dashboard/admin/transfer"
            className="group flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:border-purple-200 hover:bg-purple-50/50 hover:shadow-sm"
          >
            <div className="rounded-lg bg-purple-100 p-2 text-purple-600 transition-colors group-hover:bg-purple-200">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700">Transfer</span>
          </Link>

          <Link
            href="/dashboard/admin/attendance"
            className="group flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm"
          >
            <div className="rounded-lg bg-green-100 p-2 text-green-600 transition-colors group-hover:bg-green-200">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <span className="font-medium text-gray-700">Attendance</span>
          </Link>
        </div>
      </section>

      {/* Directory Section */}
      <section className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Employee Directory
          </h2>
          <p className="text-sm text-gray-500">
            Manage personnel roles and warehouse assignments.
          </p>
        </div>

        {/* Removed the extra border wrapper here so the search bar sits cleanly on the background */}
        <EmployeeList data={data} />
      </section>
    </div>
  );
};

export default AdminDashboard;
