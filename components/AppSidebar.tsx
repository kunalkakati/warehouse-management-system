"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Shield,
  ListChecks,
  PackagePlus,
  ChevronsUpDown,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { NavItem, NavSubItem } from "@/components/NavItem";

// Keeping arrays outside the component prevents memory reallocation on route changes
const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Tab Manager", url: "/dashboard/manager", icon: ListChecks },
];

const adminItems = [
  { title: "Dashboard", url: "/dashboard/admin" },
  { title: "Add Employee", url: "/dashboard/admin/register" },
  { title: "Transfer Employee", url: "/dashboard/admin/employees/transfer" },
  {
    title: "Employee Attendance",
    url: "/dashboard/admin/employees/attendance",
  },
];

const inventoryItems = [
  { title: "Inventory", url: "/inventory/", icon: PackagePlus },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <Sidebar
      collapsible="icon"
      // Added modern transparent background with a subtle backdrop blur
      className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              // prefetch={false} optimizes network load on dashboard mount
              render={<Link href="/dashboard" prefetch={false} />}
              className="group transition-all duration-200 hover:bg-transparent"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-200 overflow-hidden">
                <Image
                  src="/icon.svg"
                  width={32}
                  height={32}
                  alt="Orion WMS Logo"
                  className="size-full object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight">Orion</span>
                <span className="truncate text-xs font-medium text-muted-foreground/80">
                  Warehouse Management System
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-2 px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  pathname={pathname}
                  activeClassName="text-muted-foreground bg-accent-foreground font-medium pointer-events-none"
                  inactiveClassName="hover:bg-muted text-foreground hover:text-muted-foreground"
                />
              ))}
              <Collapsible
                defaultOpen={pathname.startsWith("/dashboard/admin")}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="group rounded-lg transition-all duration-200 hover:bg-muted text-foreground hover:text-muted-foreground" />
                    }
                  >
                    <Shield className="size-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Admin</span>
                    <ChevronRight className="ml-auto size-4 text-muted-foreground/50 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSub>
                        {adminItems.map((item) => (
                          <NavSubItem
                            key={item.title}
                            item={item}
                            pathname={pathname}
                          />
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            Inventory
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {inventoryItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  pathname={pathname}
                  activeClassName="bg-primary/10 text-primary font-medium pointer-events-none"
                  inactiveClassName="hover:bg-muted text-muted-foreground hover:text-foreground"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200 hover:bg-muted"
                  />
                }
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border shadow-sm">
                  <Settings className="size-4 text-slate-600 dark:text-slate-300 group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin User</span>
                  <span className="truncate text-xs text-muted-foreground">
                    admin@store.com
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl shadow-lg border-border/50 backdrop-blur-md"
                side="right"
                align="end"
              >
                <DropdownMenuItem
                  onSelect={() => router.push("/settings")}
                  className="cursor-pointer rounded-lg hover:bg-primary/5 focus:bg-primary/5"
                >
                  <Settings className="mr-2 size-4 text-muted-foreground" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => logOut()}
                  className="cursor-pointer rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 focus:bg-rose-50 focus:text-rose-600 dark:hover:bg-rose-950/50 dark:focus:bg-rose-950/50 mt-1"
                >
                  <LogOut className="mr-2 size-4" />
                  log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
