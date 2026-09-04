import React from "react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Shield, ChevronRight } from "lucide-react";
import { adminItems } from "./sidebar-data";
import { NavSubItem } from "../NavItem";

const AdminNav = ({
  pathname,
  isSuperAdmin,
}: {
  pathname: string;
  isSuperAdmin: boolean | null | undefined;
}) => {
  const FilteredAdminItem = !isSuperAdmin
    ? adminItems.filter((item) => item.title != "New Godown")
    : adminItems;

  return (
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
            {FilteredAdminItem.map((item) => (
              <NavSubItem key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default AdminNav;
