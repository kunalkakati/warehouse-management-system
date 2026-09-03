import React from "react";
import { getAllEmployee } from "@/lib/actions/user-action";
import EmployeeList from "./EmployeeList";
import Link from "next/link";
import {
  UserPlus,
  Warehouse,
  ArrowRightLeft,
  CalendarCheck,
} from "lucide-react";

const actions = [
  {
    href: "/dashboard/admin/register",
    label: "Add employee",
    icon: UserPlus,
    text: "text-[#2F5C8A]",
    bg: "bg-[#2F5C8A]/10",
    hoverBg: "hover:bg-[#2F5C8A]/15",
  },
  {
    href: "/dashboard/admin/godown/add",
    label: "Add godown",
    icon: Warehouse,
    text: "text-[#D9660B]",
    bg: "bg-[#D9660B]/10",
    hoverBg: "hover:bg-[#D9660B]/15",
  },
  {
    href: "/dashboard/admin/transfer",
    label: "Transfer",
    icon: ArrowRightLeft,
    text: "text-[#7A4FA3]",
    bg: "bg-[#7A4FA3]/10",
    hoverBg: "hover:bg-[#7A4FA3]/15",
  },
  {
    href: "/dashboard/admin/attendance",
    label: "Attendance",
    icon: CalendarCheck,
    text: "text-[#2F7D5B]",
    bg: "bg-[#2F7D5B]/10",
    hoverBg: "hover:bg-[#2F7D5B]/15",
  },
];

const AdminDashboard = async () => {
  const data = await getAllEmployee();

  const activeCount = data.filter((e) => !e.banned).length;
  const suspendedCount = data.length - activeCount;
  const godownCount = new Set(data.map((e) => e.godown?.code).filter(Boolean))
    .size;

  return (
    <div className="space-y-6">
      {/* Header: title + compact action icons */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Personnel, godowns, and daily operations.
          </p>
        </div>

        <div className="flex gap-2">
          {actions.map(({ href, label, icon: Icon, text, bg, hoverBg }) => (
            <Link
              key={href}
              href={href}
              title={label}
              className={`group flex h-10 w-10 items-center justify-center rounded-lg ${bg} ${hoverBg} transition-colors`}
            >
              <Icon className={`h-4.5 w-4.5 ${text}`} />
            </Link>
          ))}
        </div>
      </section>

      {/* Stat strip */}
      <section className="flex divide-x rounded-xl border bg-white">
        <StripStat label="Employees" value={data.length} dot="bg-[#2F5C8A]" />
        <StripStat label="Active" value={activeCount} dot="bg-[#2F7D5B]" />
        <StripStat label="Suspended" value={suspendedCount} dot="bg-red-500" />
        <StripStat label="Godowns" value={godownCount} dot="bg-[#D9660B]" />
      </section>

      {/* Directory Section */}
      <section className="space-y-4 pt-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Employee Directory
          </h2>
          <p className="text-sm text-gray-500">
            Manage personnel roles and warehouse assignments.
          </p>
        </div>

        <EmployeeList data={data} />
      </section>
    </div>
  );
};

function StripStat({
  label,
  value,
  dot,
}: {
  label: string;
  value: number;
  dot: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2.5 px-5 py-3.5 first:pl-4">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <div>
        <div className="text-lg font-semibold leading-none tracking-tight text-gray-900">
          {value}
        </div>
        <div className="mt-0.5 text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
