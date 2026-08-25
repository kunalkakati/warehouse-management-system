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
import { Shield, ListChecks, ChevronRight } from "lucide-react";
import { NavItem, NavSubItem } from "@/components/NavItem";

// Separated Components
import { SidebarLogo } from "./SidebarLogo";
import { SidebarProfile } from "./SidebarProfile";

// Config Data
import {
  mainItems,
  managerItems,
  adminItems,
  inventoryItems,
} from "./sidebar-data";

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

              <Collapsible
                defaultOpen={pathname.startsWith("/dashboard/manager")}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton className="group rounded-lg transition-all duration-200 hover:bg-muted text-foreground hover:text-muted-foreground" />
                    }
                  >
                    <ListChecks className="size-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Manager</span>
                    <ChevronRight className="ml-auto size-4 text-muted-foreground/50 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {managerItems.map((item) => (
                        <NavSubItem
                          key={item.title}
                          item={item}
                          pathname={pathname}
                        />
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

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
                      {adminItems.map((item) => (
                        <NavSubItem
                          key={item.title}
                          item={item}
                          pathname={pathname}
                        />
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* INVENTORY SECTION */}
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
                  activeClassName="..."
                  inactiveClassName="..."
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <SidebarProfile />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
