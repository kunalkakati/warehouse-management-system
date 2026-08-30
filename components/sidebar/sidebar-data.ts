// config/sidebar-data.ts
import { LayoutDashboard, PackagePlus } from "lucide-react";

export const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
];

export const managerItems = [
  { title: "Manager Dashboard", url: "/dashboard/manager" },
  { title: "Add Depositor", url: "/dashboard/manager/depositor/add" },
  { title: "Add Commoditie", url: "/dashboard/manager/commoditie/add" },
  { title: "Daily Reports", url: "/dashboard/manager/reports" },
];

export const adminItems = [
  { title: "Dashboard", url: "/dashboard/admin" },
  { title: "Add Employee", url: "/dashboard/admin/register" },
  { title: "New Godown", url: "/dashboard/admin/godown/add" },
  { title: "New Godown Location", url: "/dashboard/admin/godown/location" },
  { title: "Transfer Employee", url: "/dashboard/admin/transfer" },
  {
    title: "Employee Attendance",
    url: "/dashboard/admin/employees/attendance",
  },
];

export const inventoryItems = [
  { title: "Inventory", url: "/inventory/", icon: PackagePlus },
];

export const goodsMovment = [
  { title: "Goods In", url: "/Inventory/goods/in", icon: PackagePlus },
  { title: "Goods Out", url: "/Inventory/goods/out", icon: PackagePlus },
];
