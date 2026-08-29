// components/AppSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavItem } from "@/components/NavItem";

// Separated Components
import { SidebarLogo } from "./SidebarLogo";
import { SidebarProfile } from "./SidebarProfile";

// Config Data
import { mainItems } from "./sidebar-data";
import InventoryNav from "./InventoryNav";
import ManagerNav from "./ManagerNav";
import AdminNav from "./AdminNav";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarHeader className="py-4">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="gap-2 px-2">
        {/* GENERAL SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Dashboard  */}
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  pathname={pathname}
                  activeClassName="..."
                  inactiveClassName="..."
                />
              ))}
              {/* Manager section  */}
              <ManagerNav pathname={pathname} />
              {/* Admin Section  */}
              <AdminNav pathname={pathname} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Complete Inventory Section  */}
        <InventoryNav pathname={pathname} />
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
