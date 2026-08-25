// config/sidebar-data.ts
import { LayoutDashboard, PackagePlus } from "lucide-react";

export const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
];

export const managerItems = [
  { title: "Manager Dashboard", url: "/dashboard/manager" },
  { title: "Add Depositor", url: "/dashboard/manager/depositor/add" }, // Example sub-route
  { title: "Daily Reports", url: "/dashboard/manager/reports" }, // Example sub-route
];

export const adminItems = [
  { title: "Dashboard", url: "/dashboard/admin" },
  { title: "Add Employee", url: "/dashboard/admin/register" },
  { title: "Add New Godown", url: "/dashboard/admin/godown/add" },
  { title: "Transfer Employee", url: "/dashboard/admin/transfer" },
  {
    title: "Employee Attendance",
    url: "/dashboard/admin/employees/attendance",
  },
];

export const inventoryItems = [
  { title: "Inventory", url: "/inventory/", icon: PackagePlus },
];
